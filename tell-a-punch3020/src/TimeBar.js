import React from 'react';
import TimePoint from './TimePoint';

const TimeBar = (props) => {
    const {time} = props;

    let displayArr = [];

    const fillSlots = () => {
        //Fill array with 1 until reaching the time in props
        for(let i = 0; i < time; i++){
            displayArr.push(1)
        }
        //Subtract HP passed in props from 10 to push 0's into the array until the total length is 10
        for(let i = 0; i < 300 - time; i++){
            displayArr.push(0)
        }
    }

    fillSlots()

    const playerColor = () => {
        //For styling purposes, if p1 is passed in as props, create a p1 health bar, otherwise create a p2 health bar
        if (props.p1){
            return (
                <div className="p1_time_bar">
                    {displayArr.reverse().map((timePoint) => <TimePoint timePoint={timePoint}/>)}
                </div>
            )
        } else {
            return (
                <div className="p2_time_bar">
                    {displayArr.reverse().map((timePoint) => <TimePoint timePoint={timePoint}/>)}
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

export default TimeBar