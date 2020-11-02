import React from "react";

export default class Sound extends React.Component {
  constructor() {
    super();
    //setting up prefixing for AudioContext
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
  }
  audioCtx;
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
    this.slapGain = this.audioCtx.createGain();
    this.punchGain = this.audioCtx.createGain();
    this.punch2Gain = this.audioCtx.createGain();
    this.attackGain = this.audioCtx.createGain();
    this.panner = this.audioCtx.createPanner();
    this.slap
      .connect(this.slapGain)
      .connect(this.panner)
      .connect(this.audioCtx.destination);
    this.punch
      .connect(this.punchGain)
      .connect(this.panner)
      .connect(this.audioCtx.destination);
    this.punch2
      .connect(this.punch2Gain)
      .connect(this.panner)
      .connect(this.audioCtx.destination);
    this.attack
      .connect(this.attackGain)
      .connect(this.panner)
      .connect(this.audioCtx.destination);
  };
}
