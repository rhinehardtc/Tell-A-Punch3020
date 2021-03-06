import React from 'react';

class EndScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    p1Banner = String.raw`
____/\\\\\\\\\____________________________/\\\_____________/\\\______________/\\\__________________________________        
 __/\\\///////\\\_________________________\/\\\____________\/\\\_____________\/\\\__________________________________       
  _\/\\\_____\/\\\_________________________\/\\\____________\/\\\_____________\/\\\__/\\\____________________________      
   _\/\\\\\\\\\\\/________/\\\\\\\\_________\/\\\____________\//\\\____/\\\____/\\\__\///___/\\/\\\\\\____/\\\\\\\\\\_     
    _\/\\\//////\\\______/\\\/////\\\___/\\\\\\\\\_____________\//\\\__/\\\\\__/\\\____/\\\_\/\\\////\\\__\/\\\//////__    
     _\/\\\____\//\\\____/\\\\\\\\\\\___/\\\////\\\______________\//\\\/\\\/\\\/\\\____\/\\\_\/\\\__\//\\\_\/\\\\\\\\\\_   
      _\/\\\_____\//\\\__\//\\///////___\/\\\__\/\\\_______________\//\\\\\\//\\\\\_____\/\\\_\/\\\___\/\\\_\////////\\\_  
       _\/\\\______\//\\\__\//\\\\\\\\\\_\//\\\\\\\/\\_______________\//\\\__\//\\\______\/\\\_\/\\\___\/\\\__/\\\\\\\\\\_ 
        _\///________\///____\//////////___\///////\//_________________\///____\///_______\///__\///____\///__\//////////__`;

    p2Banner = String.raw`
__/\\\\\\\\\\\\\____/\\\\\\____________________________________________/\\\______________/\\\__________________________________        
 _\/\\\/////////\\\_\////\\\___________________________________________\/\\\_____________\/\\\__________________________________       
  _\/\\\_______\/\\\____\/\\\___________________________________________\/\\\_____________\/\\\__/\\\____________________________      
   _\/\\\\\\\\\\\\\\_____\/\\\_____/\\\____/\\\_____/\\\\\\\\____________\//\\\____/\\\____/\\\__\///___/\\/\\\\\\____/\\\\\\\\\\_     
    _\/\\\/////////\\\____\/\\\____\/\\\___\/\\\___/\\\/////\\\____________\//\\\__/\\\\\__/\\\____/\\\_\/\\\////\\\__\/\\\//////__    
     _\/\\\_______\/\\\____\/\\\____\/\\\___\/\\\__/\\\\\\\\\\\______________\//\\\/\\\/\\\/\\\____\/\\\_\/\\\__\//\\\_\/\\\\\\\\\\_   
      _\/\\\_______\/\\\____\/\\\____\/\\\___\/\\\_\//\\///////________________\//\\\\\\//\\\\\_____\/\\\_\/\\\___\/\\\_\////////\\\_  
       _\/\\\\\\\\\\\\\/___/\\\\\\\\\_\//\\\\\\\\\___\//\\\\\\\\\\_______________\//\\\__\//\\\______\/\\\_\/\\\___\/\\\__/\\\\\\\\\\_ 
        _\/////////////____\/////////___\/////////_____\//////////_________________\///____\///_______\///__\///____\///__\//////////__`;



    chooseColor = () => {
        if(this.props.p1){
            return(
                <div className="p1_end_screen" onClick={() => this.props.endGame()}>
                    <pre className="p1_end_banner">
                        <code>{this.p1Banner}</code>
                    </pre>
                    <h1>Game Over</h1>
                    <h4 className="blinking_header">(Click Anywhere to Restart)</h4>
                </div>
            )
        } else {
            return(
                <div className="p2_end_screen" onClick={() => this.props.endGame()}>
                    <pre className="p2_end_banner">
                        <code>{this.p2Banner}</code>
                    </pre>
                    <h1>Game Over</h1>
                    <h4 className="blinking_header">(Click Anywhere to Restart)</h4>
                </div>
            )
        }
    }
    
    render(){
        return (
            <>
            {this.chooseColor()}
            </>
        )
    }
}

export default EndScreen