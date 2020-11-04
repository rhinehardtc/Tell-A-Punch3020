import React from 'react';

const HitPoint = (props) => {
    const {hitPoint} = props;
    const slot = ' ';

    const slotFill = () => {
        //Both filled and unfilled hitpoints are just single spaces, but filled hitpoints are styled to have background color.
        //Create a filled hitpoint id the value passed into props is 1, otherwise create an unfilled hitpoint.
        return hitPoint === 1 ? <span className="hitpoint filled_hitpoint">{slot}</span> : <span className="hitpoint unfilled_hitpoint">{slot}</span>
    }

    return (
        <>
            {slotFill()}
        </>
    )
}

export default HitPoint