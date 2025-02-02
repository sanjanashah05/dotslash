import { Sidebar } from "../components/sidebar"; // Adjust path as needed
import { useState } from "react";
import { FaVideo, FaSms, FaUserMd } from "react-icons/fa"; // Import icons

const VideoCall = () => {
  const [callStarted, setCallStarted] = useState(false);
  const doctorName = "RAMESH SHAH"; // Predefined doctor
  const doctorPhone = "+919029980853"; // Predefined doctor's phone number
  const roomName = `doctor-${doctorName.replace(/\s/g, "-")}`;
  const jitsiURL = `https://meet.jit.si/${roomName}`;

  const sendSMS = () => {
    const message = `Join the video consultation: ${jitsiURL}`;

    // Open the phone's SMS app
    window.location.href = `sms:${doctorPhone}?body=${encodeURIComponent(message)}`;

    // Open WhatsApp Web as a fallback
    window.open(`https://wa.me/${doctorPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center p-6">
        {/* Gradient Box */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-8 rounded-3xl shadow-xl max-w-3xl w-full text-center">
          {/* Doctor Icon */}
          <div className="flex justify-center mb-4">
            <FaUserMd className="text-5xl text-white" />
          </div>

          {/* Service Heading */}
          <h1 className="text-4xl font-bold mb-3">Live Video Consultation</h1>
          <p className="text-lg text-gray-100">
            Speak to <span className="font-semibold">{doctorName}</span> instantly. Get expert medical advice from the comfort of your home.
          </p>

          {/* Start Call Button */}
          {!callStarted ? (
            <button
              className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 text-lg font-medium hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 transition-all duration-300 mx-auto"
              onClick={() => {
                setCallStarted(true);
                sendSMS();
              }}
            >
              <FaVideo className="text-xl" />
              Start Video Call
            </button>
          ) : (
            <>
              {/* Video Call Frame */}
              <div className="mt-6">
                <iframe
                  src={jitsiURL}
                  allow="camera; microphone; fullscreen"
                  className="w-full h-[60vh] border rounded-lg shadow-lg"
                ></iframe>
              </div>

              {/* SMS Resend Button */}
              <button
                className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-lg flex items-center justify-center gap-2 text-lg font-medium hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 transition-all duration-300 mx-auto"
                onClick={sendSMS}
              >
                <FaSms className="text-xl" />
                Resend Call Link via SMS
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCall;