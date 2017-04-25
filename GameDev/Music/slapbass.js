function SlapBass(ctx, master) {
    "use strict";
    this.ctx    = ctx;
    this.master = master || null;
}

SlapBass.prototype.setup = function() {
    this.osc = this.ctx.createOscillator();
    this.gainOsc = this.ctx.createGain();

    this.osc.connect(this.gainOsc);
    this.gainOsc.connect(this.master ? this.master : this.ctx.destination);
};

SlapBass.prototype.play = function(offset, freq) {
    const now = offset + this.ctx.currentTime;

    this.setup();

    this.osc.type = "sawtooth";
    this.osc.frequency.setValueAtTime(freq, now);
    this.gainOsc.gain.setValueAtTime(1, now);

    this.gainOsc.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    this.osc.start(now);
    this.osc.stop(now + 0.5);
};

// TEST
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const bass = new SlapBass(audioCtx);

bass.play(0, 110);
bass.play(0.5, 110);
bass.play(0.75, 110);
bass.play(1, 220);
bass.play(1.5, 110);

