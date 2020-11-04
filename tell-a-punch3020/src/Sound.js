import React from "react";

export default class Sound extends React.Component {
  constructor() {
    super();
    //setting up prefixing for AudioContext
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
  }
  audioCtx;
  timerTick;
  slap;
  punch;
  punch2;
  attack;
  attackSoundArray;
  panner;
  slapGain;
  punchGain;
  punch2Gain;
  attackGain;

  init = () => {
    this.audioCtx = new AudioContext();
    this.timerTick = this.audioCtx.createMediaElementSource(
      document.getElementById("timer-tick")
    );
    this.slap = this.audioCtx.createMediaElementSource(
      document.getElementById("slap")
    );
    this.punch = this.audioCtx.createMediaElementSource(
      document.getElementById("punch")
    );
    this.punch2 = this.audioCtx.createMediaElementSource(
      document.getElementById("punch2")
    );
    this.attack = this.audioCtx.createMediaElementSource(
      document.getElementById("attack")
    );
    this.attackSoundArray = [this.slap, this.punch, this.punch2];
    this.comboGain = this.audioCtx.createGain();
    this.attackGain = this.audioCtx.createGain();
    this.comboGain.gain.value = 0.15;
    this.attackGain.gain.value = 0.25;
    this.panner = this.audioCtx.createStereoPanner();
    this.timerTick
      .connect(this.comboGain)
      .connect(this.panner)
      .connect(this.audioCtx.destination);
    this.slap
      .connect(this.comboGain)
      .connect(this.panner)
      .connect(this.audioCtx.destination);
    this.punch
      .connect(this.comboGain)
      .connect(this.panner)
      .connect(this.audioCtx.destination);
    this.punch2
      .connect(this.comboGain)
      .connect(this.panner)
      .connect(this.audioCtx.destination);
    this.attack
      .connect(this.attackGain)
      .connect(this.panner)
      .connect(this.audioCtx.destination);
  };
}
