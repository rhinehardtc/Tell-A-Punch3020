import React from "react";

export default function Input(props) {
    let {input} = props;
    
    return(
        <>
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
            <div className="input_box">
                <p>{input}</p>
            </div>
        </>
    )
}