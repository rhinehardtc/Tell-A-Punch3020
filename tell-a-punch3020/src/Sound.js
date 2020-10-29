import React from "react";

export default class Sound extends React.Component {
  constructor() {
    super();
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
}
audioCtx;
slap;
punch;
punch2;
attack;
attackSoundArray = [this.slap, this.punch, this.punch2];

init = () => {
    this.audioCtx = new AudioContext();
    this.slap = this.audioCtx.createMediaElementSource(document.getElementById("slap"));
    this.punch = this.audioCtx.createMediaElementSource(document.getElementById("punch"));
    this.punch2 = this.audioCtx.createMediaElementSource(document.getElementById("punch2"));
    this.attack = this.audioCtx.createMediaElementSource(document.getElementById("attack"));
  };
}
