
smfplayer.js
============

smfplayer.js is a standard MIDI file player using [synthesizer] corresponding to [WebMidiLink](http://www.g200kg.com/en/docs/webmidilink/).


## How To Use

```js
var player = new SMF.Player();

window.addEventListener('DOMContentLoaded', function() {
  /** @type {boolean} */
  var loop = true;
  /** @type {boolean} */
  var cc111 = true;
  /** @type {boolean} */
  var falcom = true;
  /** @type {boolean} */
  var mfi = true;
  /** @type {number} */
  var tempo = 1.0;
  /** @type {number} 0-16383 */
  var volume = 16383 * 0.5;

  // player settings
  player.setLoop(loop); // Player Loop
  player.setCC111Loop(cc111); // CC#111 Loop
  player.setFalcomLoop(falcom); // Ys2 Eternal Loop
  player.setMFiLoop(mfi); // MFi Loop
  player.setTempoRate(tempo); // Playback tempo rate
  player.setMasterVolume(volume); // Master Volume
  player.setWebMidiLink('http://www.g200kg.com/en/docs/gmplayer/');

  // load standard MIDI file
  loadSMF('hoge.mid');
}, false);

/**
 * @param {string} url
 */
function loadSMF(url) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.addEventListener('load', function (event) {
    /** @type {Uint8Array} */
    var input = new Uint8Array(event.target.response);

    // load MIDI file
    player.loadMidiFile(input);
    player.play();
  }, false);
  xhr.responseType = 'arraybuffer';
  xhr.send();
}
```


## Supported Browsers

- Firefox 7+
- Google Chrome 7+
- Safari 5.1+


## WebMidiLink Compatibility

Sf2synth.js is compatible only with Link Level 1 of WebMidiLink.


## License

Copyright &copy; 2013 imaya / GREE Inc.
Licensed under the MIT License.
