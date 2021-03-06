import React from "react";
import "./App.css";
import TitleScreen from "./TitleScreen";
import Frames from "./ani_frames/Frames";
import ComboConsole from "./ComboConsole";
import HPBar from "./HPBar";
import TimeBar from "./TimeBar";
import TurnDisplay from "./TurnDisplay";
import _ from "lodash";
import Sound from "./Sound";
import EndScreen from "./EndScreen";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      started: false,
      maxLength: 5,
      comboArray1: [],
      comboArray2: [],
      comboArray3: [],
      mutatedComboArray: [],
      comboPhrase: "Attack!",
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
      btnPressCount: 0,
      anyBtnPress: false,
      turn: "P1",
      phase: "start",
      p1Input: true,
      p1HP: 10,
      p1Time: 3000,
      p1Frame: "S",
      p2Input: true,
      p2HP: 10,
      p2Time: 3000,
      p2Frame: "S",
    };

    this.phases = ["def", "atk", "start"];
    this.turns = { P1: "P2", P2: "P1" };
    this.sound = new Sound();
  }

  componentDidMount() {
    this.sound.init();
  }

  componentWillUnmount() {
    this.sound.audioCtx.close();
  }

  startGame = () => {
    this.setState({ started: true });
  };

  endGame = () => {
    this.setState({
      started: false,
      maxLength: 5,
      comboArray1: [],
      comboArray2: [],
      comboArray3: [],
      mutatedComboArray: [],
      comboPhrase: "Attack!",
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
      btnPressCount: 0,
      anyBtnPress: false,
      turn: "P1",
      phase: "start",
      p1Input: true,
      p1HP: 10,
      p1Time: 3000,
      p1Frame: "S",
      p2Input: true,
      p2HP: 10,
      p2Time: 3000,
      p2Frame: "S",
    });
  };

  decideCenterColor = () => {
    let { turn, phase } = this.state;
    if (
      (turn === "P1" && phase === "atk") ||
      (turn === "P2" && phase === "def")
    ) {
      return <ComboConsole combo={this.state.comboArray3} p1={true} />;
    } else if (
      (turn === "P2" && phase === "atk") ||
      (turn === "P1" && phase === "def")
    ) {
      return (
        <ComboConsole combo={this.state.comboArray3} center={true} p2={true} />
      );
    }
  };

  decideIfStarted = () => {
    if (this.state.p1Time === 0 || this.state.p1HP === 0) {
      return <EndScreen endGame={this.endGame} p2={true} />;
    } else if (this.state.p2Time === 0 || this.state.p2HP === 0) {
      return <EndScreen endGame={this.endGame} p1={true} />;
    } else if (this.state.started) {
      return (
        <>
          <div className="health_bars_div">
            <HPBar HP={this.state.p1HP} p1={true} />
            <div className="turn_display">
              <link
                href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
                rel="stylesheet"
              ></link>
              <TurnDisplay turn={this.state.turn} phase={this.state.phase} />
            </div>
            <HPBar HP={this.state.p2HP} p2={true} />
          </div>

          <div className="main_game_container">
            <div className="combo_phrase">{this.state.comboPhrase}</div>
            <header className="App-header">
              <TimeBar time={this.state.p1Time} p1={true} />
              <div className="fight_div">
                <Frames p1={true} frame={this.state.p1Frame} />
                <ComboConsole combo={this.state.comboArray1} p1={true} />
                {this.decideCenterColor()}
                <ComboConsole combo={this.state.comboArray2} p2={true} />
                <Frames p2={true} frame={this.state.p2Frame} />
              </div>
              <TimeBar time={this.state.p2Time} p2={true} />
            </header>
          </div>
          <h4 className="gamepad_display">{this.state.gamePads.p1.id}</h4>
        </>
      );
    } else {
      return (
        <>
          <TitleScreen startGame={this.startGame} />
        </>
      );
    }
  };

  xIsY = (combo) => {
    let newCombo = [...combo];
    const firstSwitchIndex = _.sample([0, 1, 2, 3, 4]);
    const secondSwitchIndex = _.sample(
      _.without([0, 1, 2, 3, 4], firstSwitchIndex)
    );

    const indexConversion = {
      0: "1st",
      1: "2nd",
      2: "3rd",
      3: "4th",
      4: "5th",
    };

    newCombo[firstSwitchIndex] = combo[secondSwitchIndex];
    newCombo[secondSwitchIndex] = combo[firstSwitchIndex];

    this.setState({ mutatedComboArray: newCombo });
    this.setState({
      comboPhrase: `${indexConversion[firstSwitchIndex]} is ${indexConversion[secondSwitchIndex]}`,
    });
  };

  invert = (combo) => {
    let newCombo = [...combo];
    const inversion = {
      A: "Y",
      Y: "A",
      B: "X",
      X: "B",
      "▼": "▲",
      "▲": "▼",
      "◀︎": "▶︎",
      "▶︎": "◀︎",
    };
    for (let i = 0; i < newCombo.length; i++) {
      newCombo[i] = inversion[newCombo[i]];
    }
    this.setState({ mutatedComboArray: newCombo });
    this.setState({ comboPhrase: `Inverted Inputs` });
  };

  reverse = (combo) => {
    let newCombo = [...combo];
    this.setState({ mutatedComboArray: newCombo.reverse() });
    this.setState({ comboPhrase: `Reverse Combo` });
  };

  allOfOne = (combo) => {
    let newCombo = [...combo];
    let selector = _.sample([0, 1, 2, 3, 4]);
    const indexConversion = {
      0: "1st",
      1: "2nd",
      2: "3rd",
      3: "4th",
      4: "5th",
    };
    for (let i = 0; i < newCombo.length; i++) {
      newCombo[i] = newCombo[selector];
    }
    this.setState({ mutatedComboArray: newCombo });
    this.setState({ comboPhrase: `All of ${indexConversion[selector]}` });
  };

  doNotTransform = (combo) => {
    this.setState({ mutatedComboArray: combo });
    this.setState({ comboPhrase: `Unchanged` });
  };

  transformCombo = (combo) => {
    const transformFunctions = [
      this.doNotTransform,
      this.allOfOne,
      this.reverse,
      this.invert,
      this.xIsY,
    ];
    let selector = _.sample(transformFunctions);

    selector(combo);
  };

  phases = ["def", "atk", "start"];
  turns = { P1: "P2", P2: "P1" };

  //App -> holds ALL of the state, listens to keyboard, holds keyLogger, holds update, calls reqAniFrame/update
  //update -> grabs controllers and 'listens' to their buttons, points to keyLogger, recurs w/ reqAniFrame
  //keyLogger -> handles keyboard and controller input, handles comboArr insertion

  keyLogger = (event) => {
    let { phase, p1Input, p2Input } = this.state;
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
    const p1Frames = {
      1: "K",
      2: "K",
      3: "K",
      4: "K",
      q: "K",
      w: "K",
      e: "K",
      r: "K",
    };
    const p2Frames = {
      7: "K",
      8: "K",
      9: "K",
      0: "K",
      u: "K",
      i: "K",
      o: "K",
      p: "K",
    };

    //insert transformed inputs into comboArrays or call end-of-input function
    //Player 1

    const p1ComboInsert = (k) => {
      if (
        this.state.comboArray1.length < this.state.maxLength &&
        phase !== this.phases[2]
      ) {
        this.setState({
          comboArray1: [...this.state.comboArray1, k],
        });
        _.sample(this.sound.attackSoundArray).mediaElement.play();
      } else {
        // Condition: comboArray1.length = 5
        if (
          phase === this.phases[0] &&
          _.isEqual(this.state.comboArray1, this.state.mutatedComboArray) ===
            false
        ) {
          this.setState({ p1HP: this.state.p1HP - 1 });
          this.sound.attack.mediaElement.play();
        }
        this.setState({ comboArray3: this.state.comboArray1 });
        phase === this.phases[1]
          ? this.transformCombo(this.state.comboArray1)
          : this.setState({ comboPhrase: "Attack!" });
        this.setState({ comboArray1: [] });
        //change the phase here
        if (phase === this.phases[2]) {
          this.setState({ phase: this.phases[1] });
        } else if (phase === this.phases[0]) {
          this.sound.panner.pan.value = -0.8;
          this.setState({ comboArray3: [] });
          this.setState({ phase: this.phases[1] });
        } else {
          this.sound.panner.pan.value = 0.8;
          this.setState({ phase: this.phases[0] });
          this.setState({ turn: "P2" });
        }
      }
    };

    //Player 2
    const p2ComboInsert = (k) => {
      if (this.state.comboArray2.length < this.state.maxLength) {
        this.setState({
          comboArray2: [...this.state.comboArray2, k],
        });
        _.sample(this.sound.attackSoundArray).mediaElement.play();
      } else {
        // Condition: comboArray2.length = 5
        if (
          phase === this.phases[0] &&
          _.isEqual(this.state.comboArray2, this.state.mutatedComboArray) ===
            false
        ) {
          this.setState({ p2HP: this.state.p2HP - 1 });
          this.sound.attack.mediaElement.play();
        }
        //here is where the combos are handled for phase changes
        this.setState({ comboArray3: this.state.comboArray2 });
        phase === this.phases[1]
          ? this.transformCombo(this.state.comboArray2)
          : this.setState({ comboPhrase: "Attack!" });
        this.setState({ comboArray2: [] });
        //change the phase here
        if (phase === this.phases[0]) {
          this.sound.panner.pan.value = 0.8;
          this.setState({ comboArray3: [] });
          this.setState({ phase: this.phases[1] });
        } else {
          this.sound.panner.pan.value = -0.8;
          this.setState({ phase: this.phases[0] });
          this.setState({ turn: "P1" });
        }
      }
    };

    const delayInMilliseconds = 200; //1 second

    const resetFrame = (player) => {
      if (player === 1) this.setState({ p1Frame: "S" });
      if (player === 2) this.setState({ p2Frame: "S" });
    };

    const frameSet = (player, frameKey) => {
      if (player === 1) {
        this.setState({ p1Frame: frameKey });
        setTimeout(function () {
          resetFrame(1);
        }, delayInMilliseconds);
      }
      if (player === 2) {
        this.setState({ p2Frame: frameKey });
        setTimeout(function () {
          resetFrame(2);
        }, delayInMilliseconds);
      }
    };

    //take input, filter out unwanted keys, and transform into game output
    if (phase === this.phases[2]) {
      this.startGame();
      this.setState({ phase: this.phases[1] });
      this.sound.panner.pan.value = -0.8;
      if (this.sound.audioCtx.state === "suspended") {
        this.sound.audioCtx.resume();
      }
    } else if (p1Keys[input] && p1Input) {
      p1ComboInsert(p1Keys[input]);
      frameSet(1, p1Frames[input]);
    } else if (p2Keys[input] && p2Input) {
      p2ComboInsert(p2Keys[input]);
      frameSet(2, p2Frames[input]);
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
      turn === "P2" &&
      (phase === this.phases[0] || phase === this.phases[1])
    ) {
      this.setState({
        p1Input: false,
        p2Input: true,
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
            this.state.btnPressCount < 2
          ) {
            this.setState({ btnPressCount: this.state.btnPressCount + 1 });
          } else if (
            button.pressed &&
            button.value === 1.0 &&
            this.state.btnPressCount >= 2
          ) {
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
            this.setState({ btnPressCount: 0 });
          }
        });
        this.setState({ anyBtnPress: false });
      } else {
        this.setState({ btnPressCount: 0 });
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
            this.state.btnPressCount < 2
          ) {
            this.setState({ btnPressCount: this.state.btnPressCount + 1 });
          } else if (
            button.pressed &&
            button.value === 1.0 &&
            this.state.btnPressCount >= 2
          ) {
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
          }
        });
        this.setState({ anyBtnPress: false });
      } else {
        this.setState({ btnPressCount: 0 });
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
    if (this.state.started) {
      if (this.state.turn === "P1") {
        if (this.state.p1Time > 0) {
          this.setState({ p1Time: this.state.p1Time - 1 });
          if (this.state.p1Time < 300 && this.state.p1Time % 2 === 0)
            this.sound.timerTick.mediaElement.play();
          if (this.state.p1Time < 700 && this.state.p1Time % 9 === 0)
            this.sound.timerTick.mediaElement.play();
        }
      } else {
        if (this.state.p2Time > 0) {
          this.setState({ p2Time: this.state.p2Time - 1 });
          if (this.state.p2Time < 300 && this.state.p2Time % 2 === 0)
            this.sound.timerTick.mediaElement.play();
          if (this.state.p2Time < 700 && this.state.p2Time % 9 === 0)
            this.sound.timerTick.mediaElement.play();
        }
      }
    }
  };

  runUpdate = window.requestAnimationFrame(this.update);

  render() {
    return <div className="App">{this.decideIfStarted()}</div>;
  }
}
