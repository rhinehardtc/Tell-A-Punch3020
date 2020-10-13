import React from "react";


export default function ComboConsole(props) {
    let {combo} = props;
    let displayArr = [];
    const fillSlots = () => {
        for(let i = 0; i < combo.length; i++ ){
            displayArr.push(combo[i])
        }
        for(let i = 5-combo.length; i < 5; i++){
            displayArr.push("#")
        }
    }
    
    fillSlots()
return(
    displayArr.map((key) => <div>_{key}_</div>)
)
}