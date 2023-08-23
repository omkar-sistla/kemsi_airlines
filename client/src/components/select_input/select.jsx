import React, {useState,useRef,useEffect} from "react";
import './select.css';
export default function Select(props){
        const [optionsActive,setOptionsActive]=useState(false);
        const [val, setval]=useState({
            fromVal : "",
            toVal:""
        });
        const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
        const optionsContainerRef = useRef(null);
        const selectRef = useRef(null);
        useEffect(() => {
            function handleClickOutside(event) {
                if (selectRef.current && !selectRef.current.contains(event.target)) {
                    setOptionsActive(false);
                }
            }
    
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);
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
          const handleKeyDown = (e) => {
            if (optionsActive) {
                const filteredOptions = filterOptions(props.options);
                if (e.key === "ArrowDown") {
                    setSelectedOptionIndex((prevIndex) =>
                        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
                    );
                } else if (e.key === "ArrowUp") {
                    setSelectedOptionIndex((prevIndex) =>
                        prevIndex > 0 ? prevIndex - 1 : prevIndex
                    );
                } else if (e.key === "Enter") {
                    if (selectedOptionIndex >= 0 && selectedOptionIndex < filteredOptions.length) {
                        const selectedOption = filteredOptions[selectedOptionIndex];
                        handleSelect(selectedOption[1] + "(" + selectedOption[0] + ")");
                    }
                }
                if (optionsContainerRef.current) {
                    const selectedOptionElement = optionsContainerRef.current.querySelector(".option.selected");
                    if (selectedOptionElement) {
                        const scrollTop = selectedOptionElement.offsetTop - optionsContainerRef.current.offsetTop;
                        optionsContainerRef.current.scrollTop = scrollTop;
                    }
                }
                
            }
        };
        function filterOptions(array) {
            return (array.filter( (str) => (str[0].toLowerCase().startsWith(val.fromVal.toLowerCase()) || 
            str[1].toLowerCase().startsWith(val.fromVal.toLowerCase())) 
            ) );
        }
        function createOptions(option, index){
            return(
                <div key={index} onClick={() => handleSelect(option[1]+"("+option[0]+")")} 
                onMouseEnter={() => setSelectedOptionIndex(index)}
                className={index === selectedOptionIndex ? "option selected" : "option"}>
                    <p className="iata">{option[0]}</p>
                    <div className="airport_info">
                        <p className="city">{option[1]}</p>
                        <p className="airport">{option[2]}</p>
                    </div>
                </div>
            )
        }        
    return(
        <div ref={selectRef} className={"select_input "+props.class}>
            <input placeholder={props.placeholder} type="text" value={val.fromVal} 
            onChange={(e)=> setval((prev)=>({...prev, fromVal : e.target.value}))} 
            onClick={()=>setOptionsActive(true)} onKeyDown={handleKeyDown}
            />
            <div ref={optionsContainerRef} className={optionsActive===true ? "options active" : "options"}>
                <i className="fa-solid fa-xmark" onClick={handleOptions}></i>
                {filterOptions(props.options).map(createOptions)}
            </div>
        </div>
    )
}
