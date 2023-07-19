import React, {useState} from "react";
import './select.css';
export default function Select(props){
        const [optionsActive,setOptionsActive]=useState(false);
        const [val, setval]=useState({
            fromVal : "",
            toVal:""
        });
        const handleOptions = () => {
            setOptionsActive(!optionsActive);
        }
        const handleSelect = (option) => {
            setval((prev) => ({
              ...prev,
              fromVal: option,
            }));
            setOptionsActive(false);
            props.onSelect(option);
          };
        function filterOptions(array) {
            return (array.filter( (str) => (str[0].toLowerCase().startsWith(val.fromVal.toLowerCase()) || 
            str[1].toLowerCase().startsWith(val.fromVal.toLowerCase())) 
            ) );
        }
        function createOptions(option, index){
            return(
                <div key={index} onClick={() => handleSelect(option[1]+"("+option[0]+")")} className="option">
                    <p className="iata">{option[0]}</p>
                    <div className="airport_info">
                        <p className="city">{option[1]}</p>
                        <p className="airport">{option[2]}</p>
                    </div>
                </div>
            )
        }        
    return(
        <div className={"select_input "+props.class}>
            <input placeholder={props.placeholder} type="text" value={val.fromVal} onChange={(e)=> setval((prev)=>({...prev, fromVal : e.target.value}))} onClick={handleOptions}/>
            <div className={optionsActive===true ? "options active" : "options"}>
                <i className="fa-solid fa-xmark" onClick={handleOptions}></i>
                {filterOptions(props.options).map(createOptions)}
            </div>
        </div>
    )
}
