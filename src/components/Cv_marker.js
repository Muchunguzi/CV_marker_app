import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import cvStyles from "./CvStyles.css";
import PlainWhiteTemplate from "./PlainWhiteTemplate";

const jobTitles = [
  "Software Engineer",
  "Factory Worker",
  "Customer Service Representative",
  "Security Guard",
  "Office Administrator",
  "Graphic Designer",
  "Marketing Specialist",
  "Accountant",
  "Sales Executive",
  "Data Analyst"
];



const CVGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    professionalExperience: "",
    photo: "",
    jobPosition: "",
  });

  const [filteredJobs, setFilteredJobs] = useState([]);

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

  const handleJobInput = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, jobPosition: value });

    if (value.length > 1) {
      const suggestions = jobTitles.filter((job) =>
        job.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredJobs(suggestions);
    } else {
      setFilteredJobs([]);
    }
  };

  const selectJob = (job) => {
    setFormData({ ...formData, jobPosition: job });
    setFilteredJobs([]);
  };



  return (
    <div className=" container" >
      {/* Form Section */}
      <form className="">
        <h2 className="text-xl font-bold mb-4">CV Generator</h2>
        <p>
        <label className="block">Photo:
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="mt-2" />
        </label>
        </p>
        <p>
        <label className="block">Name: </label><br/>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
        </p>
        <p>
        <label className="block">Job Position:</label><br/>
          <input
            type="text"
            name="jobPosition"
            value={formData.jobPosition}
            onChange={handleJobInput}
            placeholder="Type to get job suggestions"
            required
            className="w-full mt-1 p-2 border rounded"
          />
          {filteredJobs.length > 0 && (
            <ul className="mt-2 bg-white border rounded shadow-md">
              {filteredJobs.map((job, index) => (
                <li key={index} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => selectJob(job)}>
                  {job}
                </li>
              ))}
            </ul>
          )}
        
        </p>
        <p>
        <label className="block">Email:</label><br/>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
        </p>
        <p>
        <label className="block">Phone:</label><br/>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
        </p>
       <p>
       <label className="block">Address:</label><br/>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
       </p>
       <p>
       <label className="block">Nationality:</label><br/>
          <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
       </p>
       <p>
       <label className="block">Objective:</label><br/>
          <textarea name="objective" value={formData.objective} onChange={handleChange} required className="w-full mt-1 p-2 border rounded h-24" ></textarea>
       </p>
       <p>
       <label className="block">Education:</label><br/>
          <input type="text" name="education" value={formData.education} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
       </p>
       <p>
       <label className="block">Professional Experience:</label><br/>
          <textarea name="professionalExperience" value={formData.professionalExperience} onChange={handleChange} required className="w-full mt-1 p-2 border rounded h-24"></textarea>
       </p>
       <p>
       <label className="block">Skills:</label><br/>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
       </p>
       <p>
       <label className="block">Languages:</label><br/>
          <input type="text" name="languages" value={formData.languages} onChange={handleChange} required className="w-full mt-1 p-2 border rounded" />
       </p>
        <button type="button" onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Print CV</button>
      </form>

      {/* CV Preview Section */}
      <div className="CVs_preview">
          <PlainWhiteTemplate ref = {cvRef} formData = {formData}/>
      </div>
      
    </div>
  );
};

export default CVGenerator;

