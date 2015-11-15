import Relay from 'react-relay';
import React from 'react';
import AddPlaylistMutation from '../mutations/AddPlaylistMutation.js';

class PlaylistForm extends React.Component {
  constructor(props){
    super(props);
    console.log('YEAH GOT THE PROPS', props);
    this.state = {editMode: false, playlistName:'', user: props.user};
  }
  handleChange = (event) => {
    this.setState({playlistName:event.target.value});
  }
  handleKeyDown = (event) => {
    let ENTER_KEY_CODE = 13;
    let ESC_KEY_CODE = 27;

    if(event.keyCode === ENTER_KEY_CODE){
      //this.saveAge();
      this.savePlaylist();
    }
  }
  enterEditMode = (event) => {
    this.setState({editMode:true})
  }
  savePlaylist = () => {
    this.setState({editMode:false});

   var onSuccess = (response) => {
      console.log('Mutation successful!', response);
    };

    var onFailure = (transaction) => {
      var error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };


    Relay.Store.update(new AddPlaylistMutation({
      title: this.state.playlistName,
      id: this.props.user.id
    }), {onSuccess, onFailure});

  }
  render() {
    let component;
    let playlistName = this.state.playlistName;

    if(this.state.editMode){
      component =
        <div>
          <input onKeyDown={this.handleKeyDown} onChange={this.handleChange} value={playlistName} type="text" placeholder="title" />
          <button onClick={this.savePlaylist}>Add</button>
        </div>
      ;
    } else {
      component =
        <button onClick={this.enterEditMode}>Add a playlist</button>
      ;
    }

    return component;
  }
}


export default Relay.createContainer(PlaylistForm, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `
  }
});
