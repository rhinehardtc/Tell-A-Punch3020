import React from 'react';
import HitPoint from './HitPoint.js'

const HPBar = (props) => {
    const {HP} = props;

    let displayArr = [];

    const fillSlots = () => {
        //Fill array with 1 until reaching the HP in props
        for(let i = 0; i < HP; i++ ){
            displayArr.push(1)
        }
        //Subtract HP passed in props from 10 to push 0's into the array until the total length is 10
        for(let i = 0; i < 10 - HP; i++){
            displayArr.push(0)
        }
    }

    fillSlots()
    
    const playerColor = () => {
        //For styling purposes, if p1 is passed in as props, create a p1 health bar, otherwise create a p2 health bar
        if (props.p1){
            return (
                <div className="p1_health_bar">
                    {displayArr.reverse().map((hitPoint) => <HitPoint key={Math.random() * 10000} hitPoint={hitPoint}/>)}
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