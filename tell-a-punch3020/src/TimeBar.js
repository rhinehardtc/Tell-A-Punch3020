import React from 'react';

const TimeBar = (props) => {
    
    const {time} = props;

    // let displayArr = [];

    // const fillSlots = () => {
    //     //Fill array with 1 until reaching the time in props
    //     for(let i = 0; i < time; i++){
    //         displayArr.push(1)
    //     }
    //     //Subtract HP passed in props from 10 to push 0's into the array until the total length is 10
    //     for(let i = 0; i < 500 - time; i++){
    //         displayArr.push(0)
    //     }
    // }

    // fillSlots()
  
    const adjustedValue = (3000 - time) / 30;

    const playerColor = () => {
        //For styling purposes, if p1 is passed in as props, create a p1 health bar, otherwise create a p2 health bar
        if (props.p1){
            return (
                <>
                    {React.createElement("div", {
                        className:"p1_time_bar", 
                        style: {
                            background: 'linear-gradient(rgba(255, 0, 0, 0.11) 0%, red ' 
                            + adjustedValue 
                            + '%, white ' 
                            + ((3000 - time) / 30)
                            + '%, #be9090 100%)'}})
                    }
                </>
            )
        } else {
            return (
                <>
                    {React.createElement("div", {
                        className:"p2_time_bar", 
                        style: {
                            background: 'linear-gradient(rgba(0, 0, 255, 0.089) 0%, blue ' 
                            + adjustedValue 
                            + '%, white ' 
                            + ((3000 - time) / 30) 
                            + '%, #8687c0 100%)'}})
                    }
                </>
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