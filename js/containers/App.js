import { connect } from 'react-redux';
// import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import Relay from 'react-relay';
import React from 'react';
import { bindActionCreators } from 'redux';
import AppHomeRoute from '../routes/AppHomeRoute';
import User from '../components/User.js';
import {getQueryParams} from '../utils'
import * as AppActions from '../actions/current';

// TODO try getting different user ids to work here for separate logins

// http://rackt.org/redux/docs/basics/ExampleTodoList.html


let userId = getQueryParams(document.location.search).user || "561aecc701caeedd0b93ea97";

class App extends React.Component {
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
			}}


        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentState: state.current
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(App);