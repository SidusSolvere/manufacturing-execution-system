import { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  // 1. State Initialization (Individual states for form inputs)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [contactType, setContactType] = useState("Select");

  // 2. Submission & Validation Logic
  const handleSubmit = (e) => {
    e.preventDefault();

    if (contactType === "Select") {
      alert("Please select the contact type!");
      return;
    }

    // Log contact form data
    console.log("Contact Form Submitted:", { fullName, email, company, subject, message, contactType });

    // 3. Solution: Resetting all states after successful submission
    setFullName("");
    setEmail("");
    setCompany("");
    setSubject("");
    setMessage("");
    setContactType("Select");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-blue-200 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-sm md:max-w-md bg-white rounded-lg shadow-xl">
        
        {/* Header Section */}
        <div className="bg-blue-600 text-white rounded-t-2xl p-6 md:p-8 text-center">
          <div className="w-12 md:w-16 h-12 md:h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
            <span className="text-blue-600 text-xl md:text-2xl font-bold">MES</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Contact Us</h1>
        </div>

        {/* Form Start */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
          
          {/* Full Name Input */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base"
              required
            />
          </div>

          {/* Company Input */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">Company
              {/* Tooltip */}
              <div className="relative group inline-block">
                <button type="button" className="px-1.5 py-0.5 md:py-1 m-1 bg-gray-600/50 text-white rounded-full font-bold text-xs">?</button>
                <div className="absolute w-48 md:w-56 left-1/2 mt-2 px-2 border border-solid bg-white text-gray-700 shadow-xl rounded-xl opacity-0 group-hover:opacity-100 transition duration-400 z-10 text-xs md:text-sm">
                  <strong>Enter your company name</strong> if you are contacting on behalf of an organization
                </div>
              </div>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company Name (Optional)"
              className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base"
            />
          </div>

          {/* Contact Type Input */}
          <div>
            <label className="flex text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">Contact Type
              {/* Tooltip */}
              <div className="relative group inline-block">
                <button type="button" className="px-1.5 py-0.5 md:py-1 m-1 bg-gray-600/50 text-white rounded-full font-bold text-xs">?</button>
                <div className="absolute w-48 md:w-56 left-1/2 mt-2 px-2 border border-solid bg-white text-gray-700 shadow-xl rounded-xl opacity-0 group-hover:opacity-100 transition duration-400 z-10 text-xs md:text-sm">
                  <strong>Select the reason</strong> for contacting us to help us serve you better
                </div>
              </div>
            </label>
            <select
              value={contactType}
              onChange={(e) => setContactType(e.target.value)}
              className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-xs md:text-sm"
              required
            >
              <option value="Select">Select Type</option>
              <option value="demo">Request Demo</option>
              <option value="pricing">Pricing & Licensing</option>
              <option value="implementation">Implementation Support</option>
              <option value="integration">System Integration</option>
              <option value="consultation">Technical Consultation</option>
              <option value="partnership">Partnership Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="feedback">Product Feedback</option>
            </select>
          </div>

          {/* Subject Input */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Message Subject"
              className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-900 mb-1 md:mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message here..."
              rows="4"
              className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm md:text-base resize-none"
              required
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex justify-start">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4" required />
              <span className="ml-2 text-xs md:text-sm text-slate-600">I agree to the privacy policy</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-3 md:px-4 py-2 md:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 cursor-pointer text-sm md:text-base"
          >
            Send Message
          </button>
        </form>

        {/* Footer */}
        <div className="bg-slate-50 px-6 md:px-8 py-3 md:py-4 border-t text-center rounded-b-2xl">
          <p className="text-xs md:text-sm text-slate-600">
            Need immediate help?{" "}
            <a
              href="tel:+919876543210"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Call us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
