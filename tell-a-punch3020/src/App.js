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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ComboConsole combo={this.state.comboArray} />
          {this.state.key}
        </header>
      </div>
    );
  }
}
