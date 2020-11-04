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

    function setColor() {
        if (props.p1){
            return displayArr.map((input) => <Input input={input} p1={true} />);
        } else if (props.center) {
            return displayArr.map((input) => <Input input={input} center={true} />);
        } else {
            return displayArr.map((input) => <Input input={input} p2={true} />);
        }
        
    }
    
    fillSlots()
return(
    <div>
        {setColor()}
    </div>
    )

}