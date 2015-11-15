import Relay from 'react-relay';
import React from 'react';
import {getQueryParams} from '../utils'

import AppHomeRoute from '../routes/AppHomeRoute';

import UserTwo from './User';
import Header from './Header';

let userId = getQueryParams(document.location.search).user || '56253cfbc03328c91d730276';

// If userId/logged in state: render something else render something else

export default class Home extends React.Component {
  componentDidMount(){
  	//console.log('the beginning', this.props.actions.setSong('thing'));
  }
  render() {
  	let user = this.props.user;
  	const { currentState, actions } = this.props;
    return (
      <div>
      	<Header user={user} currentState={currentState}/>
        <UserTwo user={user}/>
      </div>
    );
  }
}


export default Relay.createContainer(Home, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        name
        surname
        ${UserTwo.getFragment('user')}
      }
    `
  }
});