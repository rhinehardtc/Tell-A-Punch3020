import React from "react";
import "./App.css";
import ComboConsole from "./ComboConsole";
import TurnDisplay from "./TurnDisplay";

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
        buttons: [{ pressed: "no gamepad, no buttons" }],
      },
      whichBtnPress: "",
      anyBtnPress: false,
      turn: "",
      phase: "",
    };
  }

  //turn: P1, P2
  //phases: transition(no inputs), atk(Px inputs only), transition(no inputs), def(Py inputs, display Px pattern), results

  //hit page and loop starts: turn P1/ phase transition - P1 input trigger. Then atk - full combo trigger. transition -
  //P2 input trigger. def - full combo trigger. results - P2 button press trigger. turn P2/ ->

  //App -> holds ALL of the state, listens to keyboard, holds keyLogger, holds update, calls reqAniFrame/update
  //update -> grabs controllers and 'listens' to their buttons, points to keyLogger, recurs w/ reqAniFrame
  //keyLogger -> handles keyboard and controller input, handles comboArr insertion

  //if turn is "" or P2, setState turn: P1

  keyLogger = (event) => {
    console.log(event.key);
    let input = event.key;
    const p1Keys = {
      1: "A",
      2: "B",
      3: "X",
      4: "Y",
      q: "▼",
      w: "▶︎",
      e: "◀︎",
      r: "▲",
    };
    const p2Keys = {
      7: "A",
      8: "B",
      9: "X",
      0: "Y",
      u: "▼",
      i: "▶︎",
      o: "◀︎",
      p: "▲",
    };
    // const displayedInputs = ["A", "B", "X", "Y", "▼", "▶︎", "◀︎", "▲"];

    //insert transformed inputs into comboArrays or call end-of-input function
    //Player 1
    const p1ComboInsert = (k) => {
      if (this.state.comboArray1.length < this.state.maxLength) {
        this.setState({
          comboArray1: [...this.state.comboArray1, k],
        });
      } else {
        this.setState({ comboArray1: [] });
      }
    };

    //Player 2
    const p2ComboInsert = (k) => {
      if (this.state.comboArray2.length < this.state.maxLength) {
        this.setState({
          comboArray2: [...this.state.comboArray2, k],
        });
      } else {
        this.setState({ comboArray2: [] });
      }
    };

    //take input, filter out unwanted keys, and transform into game output
    if (p1Keys[input]) {
      p1ComboInsert(p1Keys[input]);
    } else if (p2Keys[input]) {
      p2ComboInsert(p2Keys[input]);
    }

  };
  //end of keyLogger

    //the following serves two purposes: filtering out unwanted keyboard inputs and handling
    //the insertion logic for comboArrays
    // Player 1
    //   if (
    //     p1Keys[event.key] &&
    //     this.state.comboArray1.length !== this.state.maxLength
    //   ) {
    //     this.setState({
    //       comboArray1: [...this.state.comboArray1, p1Keys[event.key]],
    //     });
    //   } else if (
    //     p1Keys[event.key] &&
    //     this.state.comboArray1.length === this.state.maxLength
    //   ) {
    //     this.setState({ comboArray1: [] });
    //   }

    //   //Player 2
    //   if (
    //     p2Keys[event.key] &&
    //     this.state.comboArray2.length !== this.state.maxLength
    //   ) {
    //     this.setState({
    //       comboArray2: [...this.state.comboArray2, p2Keys[event.key]],
    //     });
    //   } else if (
    //     p2Keys[event.key] &&
    //     this.state.comboArray2.length === this.state.maxLength
    //   ) {
    //     this.setState({ comboArray2: [] });
    //   }
  // };

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
    (e) => {
      console.log(
        "Gamepad disconnected from index %d: %s",
        e.gamepad.index,
        e.gamepad.id
      );
    }
  );

  keyPress = window.addEventListener("keydown", (e) => this.keyLogger(e));

  // press button -> anyBtnPress turns true and triggers
  // if btn pressed, check to see if it is already in state, if not, send it thru switch to keyLog/state
  update = () => {
    const gamepads = navigator.getGamepads();

    if (gamepads[0]) {
      this.setState({ gamePad: gamepads[0] });

      this.state.gamePad.buttons.forEach((button) => {
        if (button.pressed && button.value === 1.0) {
          this.setState({ anyBtnPress: true });
        }
      });

      if (this.state.anyBtnPress) {
        this.state.gamePad.buttons.forEach((button) => {
          if (
            button.pressed &&
            button.value === 1.0 &&
            this.state.whichBtnPress === ""
          ) {
            this.setState({ whichBtnPress: button });
            switch (this.state.gamePad.buttons.indexOf(button)) {
              case 0:
                this.keyLogger({ key: "1" });
                break;
              case 1:
                this.keyLogger({ key: "2" });
                break;
              case 2:
                this.keyLogger({ key: "3" });
                break;
              case 3:
                this.keyLogger({ key: "4" });
                break;
              case 4:
                this.keyLogger({ key: "q" });
                break;
              case 5:
                this.keyLogger({ key: "w" });
                break;
              case 6:
                this.keyLogger({ key: "e" });
                break;
              case 7:
                this.keyLogger({ key: "r" });
                break;
              default:
                console.log("");
            }
            this.setState({ whichBtnPress: "" });
          }
        });
        this.setState({ anyBtnPress: false });
      } else {
        this.setState({ whichBtnPress: "" });
      }
    } else {
      this.setState((prevState) => ({
        gamePad: { ...prevState.gamePad, id: "no P1 gamepad connected" },
      }));
    }

    window.requestAnimationFrame(this.update);
  };

  runUpdate = window.requestAnimationFrame(this.update);

  render() {
    return (
      <div className="App">
        <div className="p1_button_list">
          <ol>
            {this.state.gamePad.buttons ? (
              this.state.gamePad.buttons.map((button) => (
                <li key={this.state.gamePad.buttons.indexOf(button)}>
                  {String(button.pressed)}
                </li>
              ))
            ) : (
              <li>"no gamepad, no buttons"</li>
            )}
          </ol>
        </div>

        <div className="turn_display">
          <link
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
            rel="stylesheet"
          ></link>
          <TurnDisplay turn={this.state.turn} phase={this.state.phase} />
        </div>

        <div className="p2_button_list">
          <ol>
            {this.state.gamePad.buttons ? (
              this.state.gamePad.buttons.map((button) => (
                <li key={this.state.gamePad.buttons.indexOf(button)}>
                  {String(button.pressed)}
                </li>
              ))
            ) : (
              <li>"no gamepad, no buttons"</li>
            )}
          </ol>
        </div>

        <header className="App-header">
          <ComboConsole combo={this.state.comboArray1} p1={true} />
          <ComboConsole combo={this.state.comboArray2} p2={true} />
        </header>
        <h4 className="gamepad_display">{this.state.gamePad.id}</h4>
      </div>
    );
  }
}
