import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./styles.css"; // Import local Tailwind build


const CVGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
  });

  const cvRef = useRef(null);

  const handlePrint = useReactToPrint({ 
    contentRef: cvRef, // Directly passing the ref here
    documentTitle: "My_CV",
    onPrintError: (errorLocation, error) => console.error("Print Error:", errorLocation, error),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>CV Generator</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Experience:
          <textarea name="experience" value={formData.experience} onChange={handleChange} required />
        </label>
        <button type="submit">Generate CV</button>
      </form>

      {/* Print Button */}
      <button onClick={handlePrint}>Print CV</button>

      {/* CV Preview */}
      <div ref={cvRef} className="bg-white p-6 rounded-lg shadow-md w-1/2" style={{ padding: "20px", border: "1px solid #000", marginTop: "20px" }}>
        <h2>{formData.name}</h2>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>Experience:</strong></p>
        <p>{formData.experience}</p>
      </div>
    </div>
  );
};

export default CVGenerator;
