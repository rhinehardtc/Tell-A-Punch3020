import React from "react";
import "./App.css";
import ComboConsole from "./ComboConsole";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      maxLength: 5,
      round: 1,
      comboArray: [],
      gamePad: {
        id: "no gamepad connected",
        buttons: [
          {pressed: false, touched: false, value: 0},
          {pressed: false, touched: false, value: 0},
          {pressed: false, touched: false, value: 0},
          {pressed: false, touched: false, value: 0}
        ]
      }
    };
  }

  keyLogger = (event) => {
    console.log(event.key);
    this.state.comboArray.length === this.state.maxLength
      ? this.setState({ comboArray: [] })
      : this.setState({ comboArray: [...this.state.comboArray, event.key] });
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
        <header className="App-header">
          <div className="button_list"><ol>{this.state.gamePad.buttons.map(button => <li>{String(button.pressed)}</li>)}</ol></div>
          <ComboConsole combo={this.state.comboArray} />
        </header>
        <h4 className="gamepad_display">{this.state.gamePad.id}</h4>
      </div>
    );
  }
}
