import React from 'react';
import YouTube from 'react-youtube';

export default class VideoPlayer extends React.Component {
  constructor(props){
    super(props)
    this._onReady = this._onReady.bind(this);
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
    
    console.log('the currentState', currentState);
    return (
      <YouTube
        url={currentState.currentSong.youtubeLink}
        opts={opts}
        onReady={this._onReady}
      />
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    this.props.currentState.playing ? event.target.playVideo() : event.target.pauseVideo();
  }
}