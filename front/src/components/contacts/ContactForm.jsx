import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const inputClass =
    "rounded-[7px] border border-[#232323] bg-transparent outline-none h-14 w-full px-4 text-white placeholder:text-gray-400";
  const labelText = "text-[12px] leading-[19px] font-normal text-gray-300";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (formData.firstName.trim().length < 5)
      newErrors.firstName = "First name must be more than 5 characters.";
    if (formData.lastName.trim().length < 3)
      newErrors.lastName = "Last name must be more than 3 characters.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number cannot be empty.";
    if (formData.phoneNumber.trim().length != 10)
      newErrors.phoneNumber = "Phone number must be at least 10 digits.";
    if (!formData.message.trim())
      newErrors.message = "Message cannot be empty.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Submitted:", formData); // Log form data
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="mx-4 md:mx-10" id="contact">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelText}>First Name</label>
            <div>
              <input
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Amit"
                type="text"
                className={inputClass}
              />
              {errors.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
            </div>
          </div>
          <div>
            <label className={labelText}>Last Name</label>
            <div>
              <input
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Kumar"
                type="text"
                className={inputClass}
              />
              {errors.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
            </div>
          </div>
          <div>
            <label className={labelText}>Email</label>
            <div>
              <input
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                type="email"
                className={inputClass}
              />
              {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
            </div>
          </div>
          <div>
            <label className={labelText}>Phone Number</label>
            <div>
              <input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="9876543210"
                type="tel"
                className={inputClass}
              />
              {errors.phoneNumber && <div className="text-red-500 text-sm">{errors.phoneNumber}</div>}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label className={labelText}>Message</label>
          <div>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className={`${inputClass} h-[120px] resize-none`}
            />
            {errors.message && <div className="text-red-500 text-sm">{errors.message}</div>}
          </div>
        </div>

        {/* Show success popup */}
        {showPopup && (
          <div className="mt-4 text-green-500 text-center">
            Form submitted successfully!
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-start mt-8 gap-4">
          <button
            type="submit"
            className="bg-black text-white  rounded-lg text-[16px] font-medium border border-[#0073FF] hover:bg-[#1a1a1a] hover:border-[#0073FF] transition-all shadow-[0_0_15px_rgba(0,115,255,0.7)] px-14 py-2"
      >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
