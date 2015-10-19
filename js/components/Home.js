import Relay from 'react-relay';
import React from 'react';
import {getQueryParams} from '../utils'

import AppHomeRoute from '../routes/AppHomeRoute';

import User from './User';
import Header from './Header';

let userId = getQueryParams(document.location.search).user || '56253cfbc03328c91d730276';

export default class Home extends React.Component {
  componentDidMount(){
  	//console.log('the beginning', this.props.actions.setSong('thing'));
  }
  render() {
  	const { currentState, actions } = this.props;
    return (
      <div>
      	<div>
      		<h1>Current Song: {currentState.currentSong.name}</h1>
      	</div>
        <Relay.RootContainer
        	Component={User}
        	route={new AppHomeRoute({userId: userId})}
        	renderFetched={function(data) {
			    return (
			    	<User {...data} currentState={currentState} actions={actions} />
			    );
			}}/>
      </div>
    );
  }
}