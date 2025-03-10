import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Template2CV = React.forwardRef(({ formData }, cvRef) => {
  return (
    <div ref={cvRef} className="w-[800px] mx-auto text-sm font-sans bg-white shadow-lg border border-gray-200">
      <div className="grid grid-cols-3 min-h-screen">
        {/* Left Sidebar */}
        <div className="col-span-1 bg-[#1f3b57] text-white p-6 flex flex-col items-center">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden mb-6">
            {formData.photo ? (
              <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-xs text-center px-2">
                Photo
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="mb-6 w-full">
            <h3 className="font-bold text-sm mb-2">CONTACT</h3>
            <p className="mb-1">📞 {formData.phone}</p>
            <p className="mb-1">✉️ {formData.email}</p>
            <p className="mb-1">📍 {formData.address}</p>
            <p className="text-xs break-words">🔗 {formData.website}</p>
          </div>

          {/* Education */}
          <div className="mb-6 w-full">
            <h3 className="font-bold text-sm mb-2">EDUCATION</h3>
            {formData.education?.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <p className="font-semibold text-xs">{edu.year}</p>
                <p className="text-xs">{edu.school}</p>
                <p className="text-xs italic">{edu.degree}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-6 w-full">
            <h3 className="font-bold text-sm mb-2">SKILLS</h3>
            <ul className="list-disc list-inside text-xs">
              {formData.skills?.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="w-full">
            <h3 className="font-bold text-sm mb-2">LANGUAGES</h3>
            <ul className="list-disc list-inside text-xs">
              {formData.languages?.map((lang, idx) => (
                <li key={idx}>{lang}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-2 p-8 text-gray-800">
          {/* Name + Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {formData.firstName?.toUpperCase()} {formData.lastName?.toUpperCase()}
            </h1>
            <p className="text-sm text-[#1f3b57] font-semibold">{formData.jobTitle}</p>
          </div>

          {/* Profile Summary */}
          <div className="mb-6">
            <h2 className="font-bold text-sm text-[#1f3b57] mb-1">PROFILE</h2>
            <p className="text-xs text-justify whitespace-pre-line">{formData.profile}</p>
          </div>

          {/* Work Experience */}
          <div className="mb-6">
            <h2 className="font-bold text-sm text-[#1f3b57] mb-2">WORK EXPERIENCE</h2>
            {formData.experience?.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between text-xs font-semibold">
                  <p>{exp.company}</p>
                  <p>{exp.duration}</p>
                </div>
                <p className="italic text-xs mb-1">{exp.title}</p>
                <ul className="list-disc list-inside text-xs pl-2">
                  {exp.details?.split('\n').map((point, pidx) => (
                    <li key={pidx}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* References */}
          <div>
            <h2 className="font-bold text-sm text-[#1f3b57] mb-2">REFERENCE</h2>
            <div className="grid grid-cols-2 gap-4 text-xs">
              {formData.references?.map((ref, idx) => (
                <div key={idx}>
                  <p className="font-semibold">{ref.name}</p>
                  <p>{ref.position}</p>
                  <p>{ref.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Template2CV;
