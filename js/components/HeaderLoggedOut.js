import React from 'react';
import Relay from 'react-relay';

export default class HeaderLoggedOut extends React.Component {
  componentDidMount(){
  	//console.log('the beginning', this.props.actions.setSong('thing'));
  }
  render() {
  	const { currentState, actions } = this.props;
    return (
      <div>
          <h1>Plair</h1>
      		<h3>Log In Now</h3>
      </div>
    );
  }
}

// in the future, there could be some kind of intermediate state
// logged in, hasn't logged in before, logged out