import React from 'react';

const TimePoint = (props) => {
    const {timePoint} = props;
    const slot = ' ';

    const slotFill = () => {
        //Both filled and unfilled timepoints are just single spaces, but filled timepoints are styled to have background color.
        //Create a filled timepoint id the value passed into props is 1, otherwise create an unfilled timepoint.
        return timePoint === 1 ? <span className="timepoint filled_timepoint">{slot}</span> : <span className="timepoint unfilled_timepoint">{slot}</span>
    }

    return (
        <>
            {slotFill()}
        </>
    )
}

export default TimePoint