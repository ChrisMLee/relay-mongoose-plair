import React from 'react';
import YouTube from 'react-youtube';

export default class VideoPlayer extends React.Component {
  constructor(props){
    super(props)
    this._onReady = this._onReady.bind(this);
  }
  _onEnd(e){
    let {actions} = this.props;
    actions.playNext();
    console.log('onEnd', e.data);
  }
  render() {
    const { currentState, actions } = this.props;
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    // onEnd={func}

    // get the next  video and start it
    
    console.log('the currentState', currentState);
    return (
      <YouTube
        url={currentState.currentSong.youtubeLink}
        opts={opts}
        onReady={this._onReady.bind(this)}
        onEnd={this._onEnd.bind(this)}
      />
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    this.props.currentState.playing ? event.target.playVideo() : event.target.pauseVideo();
    console.log('onReady!!!!!!', event);
  }
}

// <YouTube
//   url={string}            // required
//   id={string}             // defaults -> random string
//   className={string}      // defaults -> ""
//   opts={obj}              // defaults -> {}
//   onReady={func}          // defaults -> noop
//   onPlay={func}           // defaults -> noop
//   onPause={func}          // defaults -> noop
//   onEnd={func}            // defaults -> noop
//   onError={func}          // defaults -> noop
//   onStateChange={func}    // defaults -> noop
// />

