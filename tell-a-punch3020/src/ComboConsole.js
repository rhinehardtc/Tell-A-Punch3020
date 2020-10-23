import React from "react";
import Input from "./Input.js"

export default function ComboConsole(props) {
    let {combo} = props;
    let displayArr = [];
    const fillSlots = () => {
        for(let i = 0; i < combo.length; i++ ){
            displayArr.push(combo[i])
        }
        for(let i = 0; i < 5 - combo.length; i++){
            displayArr.push(" ")
        }
    }
    
    fillSlots()
return(
    <div>
        {displayArr.map((input) => props.p1 ? <Input input={input} p1={true}/> : <Input input={input} p2={true}/>)}
    </div>
    )
}