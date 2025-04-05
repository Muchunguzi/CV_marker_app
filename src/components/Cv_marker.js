import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import cvStyles from "./CvStyles.css";
import PlainWhiteTemplate from "./PlainWhiteTemplate";
import Template2 from "./Template2";

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
    education: [
      {year: "", school: "" , degree: ""}
    ],
  });

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentIndex , setCurrentIndex] = useState(0);
  
  const cvRef = useRef(null);

  const Templates = [PlainWhiteTemplate  ,Template2 ] /*These are the individual CV templates*/

  const ActiveTemplate = Templates[currentIndex];

  

 
  const nextTemplate = () => {
    setCurrentIndex(
      (prevIndex)  => (prevIndex + 1) % Templates.length
    )
  };

  const prevTemplate = () => {
    setCurrentIndex(
      (prevIndex)  => (prevIndex - 1 + Templates.length) % Templates.length
    )
  };

  

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

  const handleEducationChange = (index , field , value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData({...formData, education: updatedEducation});
  }

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { year: "", school: "", degree: ""}]

      })
  }

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_,idx) => idx !== index);
    setFormData({...formData, education: updatedEducation})
  }



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
         
       </p>
       {formData.education.map((edu, index) => (
        <div key={index} className="mb-4 border p-3 rounded">
          <input
             type="text"
             placeholder="Year"
             value={edu.year}
             onChange={(e) => handleEducationChange(index, 'year', e.target.value)} 
             className="block mb-2"
           />
           <input
            type="text"
            placeholder="School"
            value={edu.school}
            onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
            className="block mb-2"
           /> 
           <input
           
           type="text"
           placeholder="Degree"
           value={edu.degree}
           onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
           className="block mb-2"
           />
           <button type="button" onClick={() => removeEducation(index)} className="text-red-500 text-sm">
            Remove
           </button>
        </div>
       ))}
       <button type="button" onClick={addEducation} className="bg-blue-500 text-white px-3 py-1 rounded mt-2" >
       Add Education
       </button>
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
      <button className="bg-gray-200 hover:by-gray-300 h-14 text-gray-800 font-semibold py-2 px-4  rounded-lg shadow transition duration-200 " onClick={prevTemplate}>Previous-Template</button>
      {/* CV Preview Section */}
      <div className="CVs_preview">
      <ActiveTemplate ref = {cvRef} formData = {formData} />
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 h-14 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200" onClick={nextTemplate}>Next-Template</button>
    </div>
  );
};

export default CVGenerator;

