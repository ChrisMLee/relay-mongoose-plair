import Relay from 'react-relay';
import React from 'react';
import {getQueryParams} from '../utils'

import AppHomeRoute from '../routes/AppHomeRoute';

import UserTwo from './User';
import Header from './Header';
import VideoPlayer from './VideoPlayer'

import HeaderLoggedIn from './HeaderLoggedIn';
import HeaderLoggedOut from './HeaderLoggedOut';

let userId = getQueryParams(document.location.search).user || '562592cfde07141f228bbd7f';

// If userId/logged in state: render something else render something else

class HomeIn extends React.Component {
  componentDidMount(){
  	//console.log('the beginning', this.props.actions.setSong('thing'));
  }
  render() {
  	let user = this.props.user;
  	const { currentState, actions } = this.props;
    // let userArea = currentState.currentUser.id ? <UserTwo user={user} actions={actions}/> : null;
    // let headerArea = currentState.currentUser.id ? <HeaderLoggedIn user={user} currentState={currentState} actions={actions}/> : <HeaderLoggedOut currentState={currentState} actions={actions}/>;
    return (
      <div>
      	<HeaderLoggedIn user={user} currentState={currentState} actions={actions}/>
        <div style={mainStyle}>
          <UserTwo user={user} actions={actions}/>
          <VideoPlayer currentState={currentState} actions={actions}/>
        </div>
      </div>
    );
  }
}

var mainStyle = {
    display: 'flex',
    flexDirection: 'row'
}


export default Relay.createContainer(HomeIn, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        name
        surname
        ${UserTwo.getFragment('user')}
        ${HeaderLoggedIn.getFragment('user')}
      }
    `
  }
});