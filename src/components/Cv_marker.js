import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./styles.css"; // Import local Tailwind build

const CVMaker = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
  });

  const cvRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => cvRef.current,
    documentTitle: "My_CV",
    onBeforeGetContent: () =>
      new Promise((resolve) => {
        setTimeout(resolve, 500); // Ensures content loads before printing
        resolve();
      }),
  });
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-row items-start p-6 gap-6 .flex bg-gray-100 min-h-screen space-x-6">
      {/* Form Section */}
      <div className="self-start bg-white p-6 rounded-lg shadow-md w-1/2">
        <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
        <label for="name">Name:</label><input type="text" name="name" placeholder="Full Name" className="w-full p-2 mb-3 border rounded" onChange={handleChange} />
        <label for="email">Email:</label><input type="email" name="email" placeholder="Email" className="w-full p-2 mb-3 border rounded" onChange={handleChange} />
        <label for="phone">Phone:</label><input type="text" name="phone" placeholder="Phone Number" className="w-full p-2 mb-3 border rounded" onChange={handleChange} />
        <label for="experience">Experience:</label><textarea name="experience" placeholder="Experience" className="w-full p-2 mb-3 border rounded" onChange={handleChange}></textarea>
        <label for="skill">Skills:</label><textarea name="skills" placeholder="Skills" className="w-full p-2 mb-3 border rounded" onChange={handleChange}></textarea>
      </div>

      {/* CV Preview Section */}
      <div ref={cvRef} className="bg-white p-6 rounded-lg shadow-md w-1/2">
        <h2 className="text-xl font-semibold">{formData.name}</h2>
        <p>{formData.email} | {formData.phone}</p>
        <h3 className="text-lg font-semibold mt-4">Experience</h3>
        <p>{formData.experience}</p>
        <h3 className="text-lg font-semibold mt-4">Skills</h3>
        <p>{formData.skills}</p>
        {/* Download PDF Button */}
      <button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 self-start">Download as PDF</button>
      </div>

      
    </div>
  );
};

export default CVMaker;
