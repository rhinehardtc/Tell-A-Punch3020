import React from 'react';
import ComboConsole from './ComboConsole';
import HPBar from './HPBar';
import TimeBar from './TimeBar';

class Instructions extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    
    render(){
        return (
            <div className="instructions_screen">
                <h1 className="instructions_header">How To Play:</h1>
                <h3 className="greeting">Welcome, and thank you for playing Tell-A-Punch 3020!</h3>
                <h4>For now, Tell-A-Punch 3020 is a 2-player game only, and has controller and keyboard support.</h4>
                <h4>This game is still in development and we may add single player gameplay/online gameplay in the future.</h4>
                <p className="initial_instructions_p">
                    This is a turn based fighting game in which players enter key/button combos to attack, or defend incoming attacks.
                    Player 1 has access to the keys 1, 2, 3, 4, q, w, e, and r, and Player 2 has access to 7, 8, 9, 0, u, i, o, and p.
                    Input from either player correlates to standardized controller button displays A, B, X, Y, down, right, left, and up.
                    Tell-A-Punch 3020 has a few key elements that come into play. Let's start with the health and time bars.
                </p>
                <div className="demo_health_&_time_div">
                    <div className="instructions_time_div">
                        <p className="time_p">
                            Both players have a time bar that continually
                            runs out while their turn is active.
                            When time is low, you will hear a ticking sound.
                            Reaching 0 will mean victory for the
                            opposing player, so make your moves quickly!
                        </p>
                        <TimeBar time={2500} p1={true}/>
                    </div>
                    <div className="instructions_health_div">
                        <p className="health_p">
                            Both players have a health bar, which takes
                            damage upon unsuccessful defending phases.
                            When your health is damaged, you will hear
                            an indicating sound as well.
                            You start with 10 health points, and reaching
                            0 will spell defeat for you, so take care to
                            defend precisely, and make sure to attack
                            with confusing patterns.
                        </p>
                        <HPBar HP={7} p1={true}/>
                    </div>
                    <div className="instructions_combo_div">
                        <p className="combo_p">
                            In the center, between both figters, there
                            are 3 combo bars. There are combo bars for
                            each player, as well as one in the center,
                            which is filled with the attacking input of
                            either player on the attack phase.
                            Entering keys or buttons on your turn will 
                            enter inputs into your combo bar. Once the
                            bar has been filled, press any other key or
                            button to end the phase and/or turn.
                            After an attack has been entered, the combo
                            will appear in the center bar and a randomly
                            selected combo mutation will occur, and must
                            be interpereted by the following player in
                            the defending phase to avoid damage.
                            The reverse combo mutation means the combo 
                            must be pressed in the opposite order.
                            The inverted combo mutation means the input
                            of each key must be the opposite, so A = Y,
                            B = X, Up = Down, and Left = Right.
                            The nth is xth mutation switches 2 inputs at
                            corresponding places in the combo, such as
                            1st is 3rd, or 5th is 2nd.
                        </p>
                        <ComboConsole combo={["A","B","Y","X"]} p1={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Instructions