import React, { useState } from "react";
import "../styles/Segments.css";
import { segmentsData } from "../auxiliars/MyConsts";

const Segments = () => {
    const [selectedOption, setSelectedOption] = useState("Inquilinos");
    const handleOptionClick = (option) => {setSelectedOption(option);};
    const isOptionSelected = (option) => option === selectedOption;

    const filteredSkills = selectedOption === "All"
    ? segmentsData
    : segmentsData.filter((skill) => skill.type === selectedOption);

    return (       
        <div id="skills">            
            <div className="skills-container">
                <div className="skills-title">RentState se enfoca en dos públicos</div>
                <div className="skills-options">                   
                   
                    <p
                        className={`skills-option ${isOptionSelected("Inquilinos") && "selected"}`}
                        onClick={() => handleOptionClick("Inquilinos")}
                    >
                        Inquilinos
                    </p>
                    <p
                        className={`skills-option ${isOptionSelected("Propietarios") && "selected"}`}
                        onClick={() => handleOptionClick("Propietarios")}
                    >
                        Propietarios
                    </p>
                                      
                </div>
                <div className="skills-grid">
                    
                {filteredSkills.map((skill, index) => (
                    <div key={index} className={`skill-item ${isOptionSelected(skill.type) && "selected"}`}>
                        <img src={skill.image} alt={skill.description} className="skills-image" loop />   
                        <div className="skill-text"></div>
                        <div className="skill-title">{skill.type}</div>
                        <div className="skill-text">{skill.description}</div>
                    </div>
                ))}
                </div>
            </div>
        </div>      
    );
};

export default Segments;