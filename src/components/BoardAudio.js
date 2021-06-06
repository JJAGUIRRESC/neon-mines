import React, { Component } from "react";

class BoardAudio extends Component {
  render() {
    return (
      <div>
        <audio className="audio-bomb" autoplay>
          <source src="./bomb.ogg" type="audio/ogg"></source>
        </audio>
      </div>
    )
  }
}

export default BoardAudio;