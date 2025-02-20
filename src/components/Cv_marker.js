import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const CVGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    photo: "",
    jobPosition: "",
  });

  const cvRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef:cvRef, // Directly passing the ref here 
    documentTitle: "My_CV",
    onPrintError: (errorLocation, error) => console.error("Print Error:", errorLocation, error),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-row items-start p-6 bg-gray-100 min-h-screen space-x-6">
      {/* Form Section */}
      <form className="bg-white p-6 rounded-lg shadow-md w-1/2 space-y-4">
        <h2 className="text-xl font-bold mb-4">CV Generator</h2>
        
        <label className="block">Photo:
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="mt-2" />
        </label>
        
        <label className="block">Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
        </label>
        
        <label className="block">Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
        </label>
        
        <label className="block">Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
        </label>
        <label className="block">Job Position:
          <input type="text" name="jobPosition" value={formData.jobPosition} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
        </label>
        
        <label className="block">Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
        </label>
        
        <label className="block">Experience:
          <textarea name="experience" value={formData.experience} onChange={handleChange} required className="w-full mt-1 p-2 border rounded h-24"></textarea>
        </label>
        
        <button type="button" onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Print CV</button>
      </form>

      {/* CV Preview Section */}
      <div ref={cvRef} className="bg-white p-8 rounded-lg shadow-md w-1/2 border border-gray-300" style={{ width: '210mm', height: '297mm' }}>
        <div className="text-center mb-6">
          {formData.photo && <img src={formData.photo} alt="Profile" className="w-24 h-24 mx-auto rounded-full border" />}
          <h2 className="text-2xl font-bold mt-4">{formData.name}</h2>
        </div>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Job Position:</strong>{formData.jobPosition}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p className="mt-4"><strong>Experience:</strong></p>
        <p>{formData.experience}</p>
      </div>
    </div>
  );
};

export default CVGenerator;
