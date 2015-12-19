import Relay from 'react-relay';
import React from 'react';

import MainSectionPlaylist from './MainSectionPlaylist';

class MainSection extends React.Component {
	constructor(props){
		super(props);
		console.log('MainSection was called with props', props);

	}
  componentDidMount(){
    
  }
  componentWillReceiveProps(nextProps){
    console.log('got new props', nextProps);
  }
	render(){
    let {user:{playlists}, actions} = this.props;
    // let {currentPlaylist} = this.state;
    
    let foundPlaylist;

    if(this.props.currentState.currentPlaylist.id){
      foundPlaylist = playlists.edges.filter((edge)=> edge.node.id === this.props.currentState.currentPlaylist.id);
      console.log('the foundPlaylist', foundPlaylist);

    }

    let currentPlaylistComponent = this.props.currentState.currentPlaylist.id ? <MainSectionPlaylist playlist={foundPlaylist[0].node} actions={actions}/> : null;

		console.log('rendering with props', this.props);

		return (
		<div>
			<p>id: {this.props.currentState.currentPlaylist.id}</p>
      {currentPlaylistComponent}
		</div>
		);
	}
}


export default Relay.createContainer(MainSection, {
  initialVariables: {id: ''},
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        name
        surname
        playlists(first:100){
          edges{
            node{
              id
              ${MainSectionPlaylist.getFragment('playlist')}
            }
          }
        }
      }
    `
  }
});