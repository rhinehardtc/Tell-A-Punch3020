import React from 'react';
import './App.css';


export default class App extends React.Component {

  constructor(){
    super()
    this.state ={

    }
  }

  keyLogger = (event) => {
    console.log(event.key)
  }

  connectedController = 
    window.addEventListener("gamepadconnected", function(e) {
      console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
  });

  disconnectedController = 
    window.addEventListener("gamepaddisconnected", function(e) {
      console.log("Gamepad disconnected from index %d: %s",
        e.gamepad.index, e.gamepad.id);
  });

  keyPress = 
    window.addEventListener('keydown', (e) => this.keyLogger(e));

  bundle = (
    this.connectedController,
    this.disconnectedController,
    this.keyPress
  )

  render(){
    return (
      <div className="App">
        <header className="App-header" onFocus={this.bundle}>
        </header>
      </div>
    )
  }
}
