import React from "react";

export default function Input(props) {
    let {input} = props;

    const playerColor = () => {
        if (props.p1){
            return (
                <div className="p1_input_box">
                    <p>{input}</p>
                </div>
            )
        } else {
            return (
                <div className="p2_input_box">
                    <p>{input}</p>
                </div>
            )
        }
    }
    
    return(
        <>
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
            {playerColor()}
        </>
    )
}