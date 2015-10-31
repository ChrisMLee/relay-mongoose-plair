import React from 'react';
import Relay from 'react-relay';

import AddSongMutation from '../mutations/AddSongMutation';

/* Theorectically, this is chill 
https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html
*/

class SongForm extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {youtubeLink:'', playlist: props.user.playlists.edges[0].node.id};
  	console.log('What it is', this.state);
  }
  componentDidMount(){
  	//console.log('the beginning', this.props.actions.setSong('thing'));
  }
  handleChange(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      console.log(this.state);
      this.setState(state);
    }.bind(this);
  }
  saveSong = () => {
    Relay.Store.update(new AddSongMutation({
      id: this.state.playlist,
      youtubeLink: this.state.youtubeLink
    }));
  }
  render() {
  	const {youtubeLink, playlist} = this.state;
  	const {playlists} = this.props.user;
  	//console.log('playlists available', this.props);


  	let availablePlaylists = playlists.edges.map((edge) => {
      return <option key={edge.node.id} value={edge.node.id}>{edge.node.title}</option>;
    });

    return (
      <div>
      	<h1>SongForm</h1>
	      	<input type="text" value={youtubeLink} onChange={this.handleChange('youtubeLink')} />
	      	<select value={playlist} onChange={this.handleChange('playlist')} >
			  {availablePlaylists}
			</select>
			<button onClick={this.saveSong}>Add Song</button>
      </div>
    );
  }
}

export default Relay.createContainer(SongForm, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        playlists(first: 100) {
          edges {
            node {
              id
              title
            },
          },
        }
      }
    `
  }
});
