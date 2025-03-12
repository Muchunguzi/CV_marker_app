import React,{forwardRef} from "react";
import { FaUserCircle } from "react-icons/fa";


const PlainWhiteTemplate = forwardRef(({formData}, cvRef) => {
    return (
        <div className="plain-white-template">
             <div ref={cvRef} className="cv_plain_white" style={{ width: '210mm', height: '297mm' }}>

<div className="text-center mb-6">
  <div className="profilePhoto">
  {formData.photo ? (<img src={formData.photo} style={{height:"150px" , width:"150px"}} alt="Profile" className="object-cover rounded-full" />) : (<FaUserCircle className="text-4xl" style={{height:"150px" , width:"150px"}} />)}
  </div>
  
</div>
<div style={{display:"flex",flexDirection:"column" , alignContent: "center"}}>
<h2 className="text-2xl font-bold mt-4">{formData.name}</h2>  
<p><strong>Email:</strong> {formData.email}</p>
<p><strong>Phone:</strong> {formData.phone}</p>
<p><strong>Job Position:</strong>{formData.jobPosition}</p>
<p><strong>Address:</strong> {formData.address}</p>
<p><strong>Nationality</strong>{formData.nationality}</p>
<hr />
<p><strong>Objective</strong></p>
<p>{formData.objective}</p>
<hr />
<p><strong>Education</strong></p>
<p>{formData.education}</p>
<hr />
<p className="mt-4"><strong>Professional Experience:</strong></p>
<p>{formData.professionalExperience}</p>
<hr />
<p><strong>Skills</strong></p>
<p>{formData.skills}</p>
<hr />
<p><strong>Languages</strong></p>
<p>{formData.languages}</p>
</div>

</div>
        </div>
    )
});

export default PlainWhiteTemplate;