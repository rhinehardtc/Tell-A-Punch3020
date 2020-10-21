import React from 'react';

const HitPoint = (props) => {
    const {hitPoint} = props

    return (
        <span className="hitpoint">{hitPoint}</span>
    )
}

export default HitPoint