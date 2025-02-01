const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || 'fallbackSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

const dbURI = process.env.MONGODB_URI;
console.log("MONGODB_URI:", process.env.MONGODB_URI);

if (!dbURI) {
    console.error('MongoDB URI is required for the app to run');
    process.exit(1);
}

mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 50000,
        socketTimeoutMS: 45000,
    })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });

mongoose.set('debug', true);

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('user', UserSchema, 'user');

const QuickLinkSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    tagline: { type: String, required: false },
    website: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    location: { type: String, required: false },
    aboutUs: { type: String, required: false },
    whatsapp: { type: String, required: false },
    instagram: { type: String, required: false },
    facebook: { type: String, required: false },
    logo: { type: String, required: false },
}, { timestamps: true });

const QuickLink = mongoose.model('quicklinks', QuickLinkSchema, 'quicklinks');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ success: false, message: 'Access token is required' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

(async () => {
    try {
        const users = await User.find({});
        const links = await QuickLink.find({});
        // console.log('users from DB:', users);
        // console.log('quick links from DB:', links);
    } catch (err) {
        console.error('Error fetching users:', err);
    }
})();

app.get('/test', async (req, res) => {
    try {
        const links = await QuickLink.find({});
        res.json(links);
    } catch (err) {
        res.status(500).json({ message: 'Error connecting to database' });
    }
});

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

const allowedEmails = ['hussainyshabbir@gmail.com', 'shabbir.svnit@gmail.com', 'u23cs159@coed.svnit.ac.in', 'ayushdudwe@gmail.com', 'meetmmodi1245@gmail.com'];
const otps = {};

app.post('/api/verify-email', async (req, res) => {
    const { email } = req.body;

    if (!allowedEmails.includes(email)) {
        return res.status(400).json({ success: false, message: 'Email is not allowed.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    otps[email] = { hashedOtp, expiresAt: Date.now() + 10 * 60 * 1000 };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shabbirhussainy2@gmail.com',
            pass: 'odbo nwsb encv yxbf',
        },
    });

    const mailOptions = {
        from: 'shabbirhussainy2@gmail.com',
        to: email,
        subject: 'Your One-Time Password (OTP)',
        text: `
  Dear User,
  
  Your One-Time Password (OTP) for verification is: ${otp}
  
  Please use this code to complete your process. This code is valid for the next 10 minutes.
  
  If you did not request this OTP, please ignore this email or contact our support team immediately.
  
  Thank you,
  Shabbir
  `,
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send OTP.' });
        }
        res.json({ success: true, message: 'OTP sent successfully.' });
    });
});

app.post('/api/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (otps[email] && (await bcrypt.compare(otp, otps[email].hashedOtp))) {
        if (Date.now() > otps[email].expiresAt) {
            delete otps[email];
            return res.status(400).json({ success: false, message: 'OTP expired.' });
        }
        delete otps[email];
        res.json({ success: true, message: 'OTP verified.' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid OTP.' });
    }
});

// app.post('/api/login', async (req, res) => {
//     const { username, password, captcha } = req.body;
//     console.log('Received login request for username:', username);

//     try {
//         if (!req.session || req.session.captcha !== captcha) {
//             console.error('Invalid CAPTCHA attempt for username:', username);
//             return res.status(400).json({ success: false, message: 'Invalid CAPTCHA' });
//         }
//         req.session.captcha = null;

//         const userPerson = await User.findOne({ username });
//         console.log('User lookup result:', userPerson);

//         if (!userPerson) {
//             console.error('No user found for username:', username);
//             return res.status(400).json({ success: false, message: 'Invalid login credentials' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, userPerson.password);

//         if (!isPasswordValid) {
//             console.error('Password mismatch for username:', username);
//             return res.status(400).json({ success: false, message: 'Invalid login credentials' });
//         }
//         console.log('Login successful for user:', username);
//         res.json({ success: true, message: 'Login successful' });
//     } catch (err) {
//         console.error('Error during login attempt:', err);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

app.post('/api/login', async (req, res) => {
    const { username, password, captcha } = req.body;
    console.log('Received login request for username:', username);

    try {
        if (!req.session || req.session.captcha !== captcha) {
            console.error('Invalid CAPTCHA attempt for username:', username);
            return res.status(400).json({ success: false, message: 'Invalid CAPTCHA' });
        }
        req.session.captcha = null;

        const userPerson = await User.findOne({ username });
        console.log('User lookup result:', userPerson);

        if (!userPerson) {
            console.error('No user found for username:', username);
            return res.status(400).json({ success: false, message: 'Invalid login credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, userPerson.password);

        if (!isPasswordValid) {
            console.error('Password mismatch for username:', username);
            return res.status(400).json({ success: false, message: 'Invalid login credentials' });
        }

        const accessToken = jwt.sign({ username: userPerson.username }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        console.log('Login successful for user:', username);
        res.json({ success: true, message: 'Login successful', accessToken });

    } catch (err) {
        console.error('Error during login attempt:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});



app.get('/api/quicklinks', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const links = await QuickLink.find({}).skip(skip).limit(parseInt(limit));
        const total = await QuickLink.countDocuments();

        res.json({ links, totalPages: Math.ceil(total / limit) });
    } catch (err) {
        console.error('Error fetching quick links:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/quicklinks', async (req, res) => {
    const { companyName, tagline, website, phone, email, location, aboutUs, whatsapp, instagram, facebook, logo } = req.body;
    try {
        const newLink = new QuickLink({ companyName, tagline, website, phone, email, location, aboutUs, whatsapp, instagram, facebook, logo });
        await newLink.save();
        res.status(201).json({ message: 'Quick link added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding quick link' });
    }
});

app.get('/api/quicklinks/:companyName', async (req, res) => {
    const { companyName } = req.params;
    console.log('Fetching Quick Link:', companyName);
    try {
        const link = await QuickLink.findOne({ companyName: decodeURIComponent(companyName) });
        if (!link) {
            return res.status(404).json({ error: 'Quick link not found' });
        }

        res.status(200).json(link);
    } catch (error) {
        console.error('Error fetching quick link:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/quicklinks/:companyName', async (req, res) => {
    const { companyName } = req.params;
    const { tagline, website, phone, email, location, aboutUs, whatsapp, instagram, facebook } = req.body;
    console.log('Updating Quick Link:', companyName, { tagline, website, phone, email, location, aboutUs, whatsapp, instagram, facebook });
    const updates = { tagline, website, phone, email, location, aboutUs, whatsapp, instagram, facebook };
    try {
        const updatedQuickLink = await QuickLink.findOneAndUpdate(
            { companyName }, updates, { new: true });
        if (!updatedQuickLink) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json(updatedQuickLink);
    } catch (error) {
        console.error('Error updating Quick Link:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/check-company-name', async (req, res) => {
    const { companyName } = req.query;
    console.log('Checking company name:', companyName);
    try {
        const existingLink = await QuickLink.findOne({ companyName: decodeURIComponent(companyName) });
        if (existingLink) {
            return res.json({ isAvailable: false });
        }
        res.json({ isAvailable: true });
    } catch (error) {
        console.error('Error checking company name:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
