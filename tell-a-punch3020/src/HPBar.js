import React from 'react';
import HitPoint from './HitPoint.js'

const HPBar = (props) => {
    const {HP} = props;

    let displayArr = [];

    const fillSlots = () => {
        for(let i = 0; i < HP; i++ ){
            displayArr.push("🁢")
        }
        for(let i = 0; i < 10 - HP; i++){
            displayArr.push(" ")
        }
    }

    fillSlots()
    
    const playerColor = () => {
        if (props.p1){
            return (
                <div className="p1_health_bar">
                    {displayArr.map((hitPoint) => <HitPoint key={Math.random() * 10000} hitPoint={hitPoint}/>)}
                </div>
            )
        } else {
            return (
                <div className="p2_health_bar">
                    {displayArr.map((hitPoint) => <HitPoint key={Math.random() * 10000} hitPoint={hitPoint}/>)}
                </div>
            )
        }
    }
    
   

    return(
        <>
            {playerColor()}
        </>
    )
}

export default HPBar