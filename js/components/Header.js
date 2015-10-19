import React from 'react';

export default class Header extends React.Component {
  componentDidMount(){
  	//console.log('the beginning', this.props.actions.setSong('thing'));
  }
  render() {
  	const { currentState, actions } = this.props;
    return (
      <div>
      	<div>
      		<h1>Hello {user.name} {user.surname}</h1>
      		<h1>Current Song: {currentState.currentSong.name}</h1>
      	</div>
      </div>
    );
  }
}