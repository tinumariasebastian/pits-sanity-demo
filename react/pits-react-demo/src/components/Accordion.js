import React from "react";
import { useState } from "react";

const accordiaonItems = [
    {title:"title 1", content : " content 1"},
    {title:"title 2", content : " content 2"},
    {title:"title 3", content : " content 3"}
]

export default function Accordion(){

    const[activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
      }; 

    return(
        <div className="accordion" >
            {
                accordiaonItems.map((item, index) => {
                    const active = index === activeIndex ? 'active' : '';
                    return(
                    <div key={index}>
                        <div className={`title ${active}`} onClick={() => onTitleClick(index)}>  
                            <i className="arrow">
                            </i>{item.title}
                        </div>
                        <div className={`content ${active}`}>{item.content}</div>
                    </div>
                    )
                    
                   
                   
                })
            }
            
        </div>
    );
}