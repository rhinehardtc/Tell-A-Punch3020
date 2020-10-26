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
      gamePad: {
        id: "no gamepad connected",
        buttons: [{ pressed: "no gamepad, no buttons" }],
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

  //turn: P1, P2
  //phases: transition(no inputs), atk(Px inputs only), transition(no inputs), def(Py inputs, display Px pattern), results

  //hit page and loop starts: turn P1/ phase transition - P1 input trigger. Then atk - full combo trigger. transition -
  //P2 input trigger. def - full combo trigger. results - P2 button press trigger. turn P2/ ->

  //App -> holds ALL of the state, listens to keyboard, holds keyLogger, holds update, calls reqAniFrame/update
  //update -> grabs controllers and 'listens' to their buttons, points to keyLogger, recurs w/ reqAniFrame
  //keyLogger -> handles keyboard and controller input, handles comboArr insertion

  //p1 gets to input on: p1 - atkTrans, atk, results. p2 - defTrans, def, results
  //p2 gets to input on: p1 - defTrans, def, results. p2 - atkTrans, atk, results
  //if p1 - atk

  keyLogger = (event) => {
    let { turn, phase, p1Input, p2Input } = this.state;

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

  update = () => {
    let { turn, phase } = this.state;
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
    if (gamepads[0]) {
      this.setState({ gamePad: gamepads[0] });

      //press button -> anyBtnPress turns true and triggers conditions below
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
            this.state.whichBtnPress !== button
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

    this.timeKiller()

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
  }

  runUpdate = window.requestAnimationFrame(this.update);

  render() {
    return (
      <div className="App">
        {this.decideIfStarted()}
      </div>
    );
  }
}
