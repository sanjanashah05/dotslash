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
app.use(express.json());  
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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

const PatientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    contact: { type: String, required: true },
    address: {type: String, required: true},
    allergies: {type: String, required: true}, 
    chronicDiseases: {type: String, required: true}, 
    medicationsname: {type: String, required: true},
    medicationsdosage : {type: String, required: true},
    medicationsfrequency : {type: String, required: true},
    bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    medicalHistory: {type: String, required: true},
    insuranceprovider: {type: String, required: true},
    insurancepolicynumber: {type: String, required: true},
}, { timestamps: true });

const Patient = mongoose.model('patients', PatientSchema, 'patients');

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
        const patients = await Patient.find({});
        console.log('users from DB:', users);
        console.log('patients from DB:', patients);
    } catch (err) {
        console.error('Error fetching users:', err);
    }
})();

app.get('/test', async (req, res) => {// This code snippet adds a middleware to handle errors and a route to handle 404 errors.
app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
    try {
        const patient = await Patient.find({});
        res.json(patient);
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
            maxAge: 60 * 60 * 1000, 
        });
        console.log('Login successful for user:', username);
        res.json({ success: true, message: 'Login successful', accessToken });

    } catch (err) {
        console.error('Error during login attempt:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


app.get('/api/patients', async (req, res) => {
    try {
        console.log("flag");
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const patients = await Patient.find({}).skip(skip).limit(parseInt(limit));
        const total = await Patient.countDocuments();

        console.log('Patients:', patients);

        res.json({ patients, totalPages: Math.ceil(total / limit) });
    } catch (err) {
        console.error('Error fetching quick links:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/patients', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            contact,
            address,
            allergies,
            chronicDiseases,
            medicationsname,
            medicationsdosage,
            medicationsfrequency,
            bloodType,
            medicalHistory,
            insuranceprovider,
            insurancepolicynumber
          } = req.body;

          const newPatient = new Patient({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            contact,
            address,
            allergies,
            chronicDiseases,
            medicationsname,
            medicationsdosage,
            medicationsfrequency,
            bloodType,
            medicalHistory,
            insuranceprovider,
            insurancepolicynumber
          });

        await newPatient.save();
        res.status(201).json({ message: 'Patient record added successfully', patient: newPatient });

    } catch (error) {
        res.status(500).json({ message: 'Error adding patient record', error: error.message });
    }
});

app.get('/api/patient/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(patient);
    } catch (error) {
        console.error('Error fetching patient data:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


app.put('/api/patient/edit/:id', async (req, res) => { 
    const { id } = req.params;
    const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        contact,
        address,
        allergies,
        chronicDiseases,
        medicationsname,
        medicationsdosage,
        medicationsfrequency,
        bloodType,
        medicalHistory,
        insuranceprovider,
        insurancepolicynumber
      } = req.body;

      console.log('Updating Patient Record:', id, {
        firstName, 
        lastName, 
        dateOfBirth, 
        gender, 
        contact, 
        address, 
        allergies, 
        chronicDiseases, 
        medicationsname, 
        medicationsdosage, 
        medicationsfrequency, 
        bloodType, 
        medicalHistory, 
        insuranceprovider, 
        insurancepolicynumber
    });

    console.log(`updating patient record:`,id, req.body);

    try {
        console.log("flag flag flag");
        const updatedPatient = await Patient.findByIdAndUpdate(
            id,
            {
                firstName, 
                lastName, 
                dateOfBirth, 
                gender, 
                contact, 
                address, 
                allergies, 
                chronicDiseases, 
                medicationsname, 
                medicationsdosage, 
                medicationsfrequency, 
                bloodType, 
                medicalHistory, 
                insuranceprovider, 
                insurancepolicynumber
            },
            { new: true, runValidators: true }
        );
        

        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(updatedPatient);
    } catch (error) {
        console.error('Error updating Patient Record:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// app.get('/api/patients/:id', async (req, res) => {
//     try {
//       const { id } = req.params; // Extract the patient ID from the URL parameter
//       console.log('Fetching patient details for ID:', id);
//       const patient = await Patient.findById(id); // Assuming Patient is your Mongoose model
  
//       if (!patient) {
//         return res.status(404).json({ message: 'Patient not found' });
//       }
  
//       res.status(200).json(patient); // Respond with patient data
//     } catch (error) {
//       console.error('Error fetching patient details:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });

  app.get('/api/patients/:id', async (req, res) => {
    try {
        console.log('Request received:', req.url); 
        console.log('Request Params:', req.params); 

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Patient ID is required' });
        }

        console.log('Fetching patient details for ID:', id);

        // Validate if ID is a valid MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid Patient ID format' });
        }

        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(patient);
    } catch (error) {
        console.error('Error fetching patient details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

  

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
