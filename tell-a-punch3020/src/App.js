import React from "react";
import "./App.css";
import ComboConsole from "./ComboConsole";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      maxLength: 5,
      round: 1,
      comboArray1: [],
      comboArray2: [],
      gamePad: {
        id: "no gamepad connected",
        buttons: [
          {pressed: "no gamepad, no buttons"}
        ]
      }
    };
  }

  keyLogger = (event) => {
    console.log(event.key);
    const p1Keys = ['1','2','3','4','q','w','e','r']
    const p2Keys = ['7','8','9','0','u','i','o','p']

    if (p1Keys.includes(event.key) && this.state.comboArray1.length !== this.state.maxLength){
      this.setState({ comboArray1: [...this.state.comboArray1, event.key] })
    } else if (p1Keys.includes(event.key) && this.state.comboArray1.length === this.state.maxLength) {
      this.setState({ comboArray1: [] })
    }

    if (p2Keys.includes(event.key) && this.state.comboArray2.length !== this.state.maxLength){
      this.setState({ comboArray2: [...this.state.comboArray2, event.key] })
    } else if (p2Keys.includes(event.key) && this.state.comboArray2.length === this.state.maxLength) {
      this.setState({ comboArray2: [] })
    }
  };

  connectedController = window.addEventListener("gamepadconnected", (e) => {
    console.log(
      "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index,
      e.gamepad.id,
      e.gamepad.buttons.length,
      e.gamepad.axes.length
    );
  });

  disconnectedController = window.addEventListener(
    "gamepaddisconnected",
    function (e) {
      console.log(
        "Gamepad disconnected from index %d: %s",
        e.gamepad.index,
        e.gamepad.id
      );
    }
  );

  keyPress = window.addEventListener("keydown", (e) => this.keyLogger(e));

  update = () => {
    const gamepads = navigator.getGamepads()

    gamepads[0] 
    ? this.setState({gamePad: gamepads[0]}) 
    : this.setState(prevState => ({gamePad: {...prevState.gamePad, id: 'no gamepad connected'}}))

    window.requestAnimationFrame(this.update)
  }

  runUpdate = window.requestAnimationFrame(this.update);

  render() {
    return (
      <div className="App">
        <div className="p1_button_list">
            <ol>
              {this.state.gamePad.buttons 
               ? this.state.gamePad.buttons.map(button => <li key={this.state.gamePad.buttons.indexOf(button)}>{String(button.pressed)}</li>) 
               : <li>"no gamepad, no buttons"</li>}
            </ol>
        </div>
        <div className="p2_button_list">
            <ol>
              {this.state.gamePad.buttons 
               ? this.state.gamePad.buttons.map(button => <li key={this.state.gamePad.buttons.indexOf(button)}>{String(button.pressed)}</li>) 
               : <li>"no gamepad, no buttons"</li>}
            </ol>
        </div>
        <header className="App-header">
          <ComboConsole combo={this.state.comboArray1} p1={true}/>
          <ComboConsole combo={this.state.comboArray2} p2={true}/>
        </header>
        <h4 className="gamepad_display">{this.state.gamePad.id}</h4>
      </div>
    );
  }
}
