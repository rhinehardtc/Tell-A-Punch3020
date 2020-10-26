import React from "react";
import "./App.css";
import TitleScreen from "./TitleScreen"
import Frames from "./ani_frames/Frames";
import ComboConsole from "./ComboConsole";
import HPBar from "./HPBar";
import TimeBar from "./TimeBar";
import TurnDisplay from "./TurnDisplay";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      started: false,
      maxLength: 5,
      comboArray1: [],
      comboArray2: [],
      // gps: {p1: {id: , buttons: []}, p2: {id: , buttons: []},}
      gamePads: {
        p1: {
          id: "no gamepad connected",
          buttons: [{ pressed: "no gamepad, no buttons" }],
        },
        p2: {
          id: "no gamepad connected",
          buttons: [{ pressed: "no gamepad, no buttons" }],
        },
      },
      whichBtnPress: "",
      anyBtnPress: false,
      turn: "P1",
      phase: "atkTransition",
      p1Input: true,
      p1HP: 10,
      p1Time: 300,
      p2Input: true,
      p2HP: 10,
      p2Time: 300,
    };
  }

  startGame = () => {
    this.setState({started: true})
  }

  decideIfStarted = () => {
    if(this.state.started){
      return (
        <>
        {/* <div className="p1_button_list">
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
        </div> */}

        <div className="turn_display">
          <link
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
            rel="stylesheet"
          ></link>
          <TurnDisplay turn={this.state.turn} phase={this.state.phase} />
        </div>

        {/* <div className="p2_button_list">
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
        </div> */}

        <div className="health_bars_div">
          <HPBar HP={this.state.p1HP} p1={true} />
          <HPBar HP={this.state.p2HP} p2={true} />
        </div>

        <header className="App-header">
          <TimeBar time={this.state.p1Time} p1={true}/>
          <div className="fight_div">
            <Frames p1={true} />
            <ComboConsole combo={this.state.comboArray1} p1={true} />
            <ComboConsole combo={this.state.comboArray2} p2={true} />
            <Frames p2={true} />
          </div>
          <TimeBar time={this.state.p2Time} p2={true}/>
        </header>
        <h4 className="gamepad_display">{this.state.gamePad.id}</h4>
        </>
      )
    } else {
      return (
        <>
        <TitleScreen startGame={this.startGame}/>
        </>
      )
    }
  }

  phases = ["atkTransition", "atk", "defTransition", "def", "result"];
  turns = { P1: "P2", P2: "P1" };

  //App -> holds ALL of the state, listens to keyboard, holds keyLogger, holds update, calls reqAniFrame/update
  //update -> grabs controllers and 'listens' to their buttons, points to keyLogger, recurs w/ reqAniFrame
  //keyLogger -> handles keyboard and controller input, handles comboArr insertion

  keyLogger = (event) => {
    let { turn, phase, p1Input, p2Input } = this.state;

    console.log(event);
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
        this.setState({ comboArray2: [] });
        if (phase === this.phases[1]) {
          this.setState({ phase: this.phases[2] });
        } else {
          this.setState({ phase: this.phases[4] });
        }
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
        if (phase === this.phases[1]) {
          this.setState({ phase: this.phases[2] });
        } else {
          this.setState({ phase: this.phases[4] });
        }
      }
    };

    //take input, filter out unwanted keys, and transform into game output
    if (p1Keys[input] && p1Input) {
      if (phase === this.phases[1] || phase === this.phases[3]) {
        p1ComboInsert(p1Keys[input]);
      } else {
        if (phase === this.phases[0]) {
          this.setState({ phase: this.phases[1] });
        } else if (phase === this.phases[2]) {
          this.setState({ phase: this.phases[3] });
        } else {
          this.setState({
            turn: this.turns[turn],
            phase: this.phases[0],
          });
        }
      }
    } else if (p2Keys[input] && p2Input) {
      if (phase === this.phases[1] || phase === this.phases[3]) {
        p2ComboInsert(p2Keys[input]);
      } else {
        if (phase === this.phases[0]) {
          this.setState({ phase: this.phases[1] });
        } else if (phase === this.phases[2]) {
          this.setState({ phase: this.phases[3] });
        } else {
          this.setState({
            turn: this.turns[turn],
            phase: this.phases[0],
          });
        }
      }
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
    (e) => {
      console.log(
        "Gamepad disconnected from index %d: %s",
        e.gamepad.index,
        e.gamepad.id
      );
    }
  );

  keyPress = window.addEventListener("keydown", (e) => this.keyLogger(e));

  update = () => {
    let { turn, phase, p1Input, p2Input } = this.state;
    const gamepads = navigator.getGamepads();

    //Input toggles based on phase/turn order
    if (
      turn === "P1" &&
      (phase === this.phases[0] || phase === this.phases[1])
    ) {
      this.setState({
        p1Input: true,
        p2Input: false,
      });
    } else if (
      turn === "P1" &&
      (phase === this.phases[2] || phase === this.phases[3])
    ) {
      this.setState({
        p1Input: false,
        p2Input: true,
      });
    } else if (
      turn === "P2" &&
      (phase === this.phases[0] || phase === this.phases[1])
    ) {
      this.setState({
        p1Input: false,
        p2Input: true,
      });
    } else if (
      turn === "P2" &&
      (phase === this.phases[2] || phase === this.phases[3])
    ) {
      this.setState({
        p1Input: true,
        p2Input: false,
      });
    } else {
      this.setState({
        p1Input: true,
        p2Input: true,
      });
    }

    //setting controllers to state and "listening" for their inputs
    // Player 1
    if (gamepads[0]) {
      this.setState((prevState) => {
        return {
          gamePads: {
            p1: gamepads[0],
            p2: { ...prevState.gamePads.p2 },
          },
        };
      });

      //press button -> anyBtnPress turns true and triggers conditions below
      this.state.gamePads.p1.buttons.forEach((button) => {
        if (button.pressed && button.value === 1.0 && p1Input) {
          this.setState({ anyBtnPress: true });
        }
      });

      if (this.state.anyBtnPress && p1Input) {
        this.state.gamePads.p1.buttons.forEach((button) => {
          if (
            button.pressed &&
            button.value === 1.0 &&
            this.state.whichBtnPress !== button
          ) {
            this.setState({ whichBtnPress: button });

            const p1Translate = {
              0: { key: "1" },
              1: { key: "2" },
              2: { key: "3" },
              3: { key: "4" },
              4: { key: "q" },
              5: { key: "w" },
              6: { key: "e" },
              7: { key: "r" },
            };

            this.keyLogger(
              p1Translate[this.state.gamePads.p1.buttons.indexOf(button)]
            );
            this.setState({ whichBtnPress: "" });
          }
        });
        this.setState({ anyBtnPress: false });
      } else {
        this.setState({ whichBtnPress: "" });
      }
    } else {
      this.setState((prevState) => ({
        gamePads: {
          p1: { id: "no P1 gamepad connected" },
          p2: { ...prevState.gamePads.p2 },
        },
      }));
    }

    // poll gamepads, set state, map buttons and press to raise flag(anyBtnPress).
    // if flag, map buttons and set pressed one to state, translate and send to keyLogger
    // keyLogger will handle toggling controller inputs on/off based on turn cycle

    // Player 2
    if (gamepads[1]) {
      this.setState((prevState) => {
        return {
          gamePads: {
            p1: { ...prevState.gamePads.p1 },
            p2: gamepads[1],
          },
        };
      });

      //press button -> anyBtnPress turns true and triggers conditions below
      this.state.gamePads.p2.buttons.forEach((button) => {
        if (button.pressed && button.value === 1.0 && p2Input) {
          this.setState({ anyBtnPress: true });
        }
      });

      if (this.state.anyBtnPress && p2Input) {
        this.state.gamePads.p2.buttons.forEach((button) => {
          if (
            button.pressed &&
            button.value === 1.0 &&
            this.state.whichBtnPress !== button
          ) {
            this.setState({ whichBtnPress: button });

            const p2Translate = {
              0: { key: "7" },
              1: { key: "8" },
              2: { key: "9" },
              3: { key: "0" },
              4: { key: "u" },
              5: { key: "i" },
              6: { key: "o" },
              7: { key: "p" },
            };

            this.keyLogger(
              p2Translate[this.state.gamePads.p2.buttons.indexOf(button)]
            );

            this.setState({ whichBtnPress: "" });
          }
        });
        this.setState({ anyBtnPress: false });
      } else {
        this.setState({ whichBtnPress: "" });
      }
    } else {
      this.setState((prevState) => ({
        gamePads: {
          p1: { ...prevState.gamePads.p1 },
          p2: { id: "no P2 gamepad connected" },
        },
      }));
    }

    this.timeKiller();

    window.requestAnimationFrame(this.update);
  };

  timeKiller = () => {

    if(this.state.started){
      if(this.state.turn === "P1"){
        if(this.state.p1Time > 0) this.setState({p1Time: this.state.p1Time - 1})
      } else {
        if(this.state.p2Time > 0) this.setState({p2Time: this.state.p2Time - 1})
      }
    }
  };

  runUpdate = window.requestAnimationFrame(this.update);

  render() {
    return (
      <div className="App">
        {this.decideIfStarted()}
      </div>
    );
  }
}
