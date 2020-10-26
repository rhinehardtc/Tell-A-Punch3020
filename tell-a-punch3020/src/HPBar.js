import React from 'react';
import HitPoint from './HitPoint.js'

class HPBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            changed: false,
        }
    }

    componentDidMount(){
        this.fillSlots()
        this.setState({changed: !this.state.changed})
    }

    displayArr = [];

    fillSlots = () => {
        //Fill array with 1 until reaching the HP in props
        for(let i = 0; i < this.props.HP; i++ ){
            this.displayArr.push(1)
        }
        //Subtract HP passed in props from 10 to push 0's into the array until the total length is 10
        for(let i = 0; i < 10 - this.props.HP; i++){
            this.displayArr.push(0)
        }
    }
    
    playerColor = () => {
        //For styling purposes, if p1 is passed in as props, create a p1 health bar, otherwise create a p2 health bar
        if (this.props.p1){
            return (
                <div className="p1_health_bar">
                    {this.displayArr.map((hitPoint) => <HitPoint hitPoint={hitPoint}/>)}
                </div>
            )
        } else {
            return (
                <div className="p2_health_bar">
                    {this.displayArr.map((hitPoint) => <HitPoint hitPoint={hitPoint}/>)}
                </div>
            )
        }
    }


    shouldComponentUpdate(nextProps, nextState){
        if(this.props.HP !== nextProps.HP || this.state.changed !== nextState.changed){
            return true
        }
        return false
    }
   
    render() {
        return(
            <>
                {this.playerColor()}
            </>
        )
    }
}

export default HPBar