import React from "react";

export default function TurnDisplay(props) {
  let { turn, phase } = props;

  return(
      <>
        {turn}
        <br></br>
        {phase}
    </>
  )
}
