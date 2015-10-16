import { connect } from 'react-redux';
// import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import Relay from 'react-relay';
import React from 'react';

import AppHomeRoute from '../routes/AppHomeRoute';
import User from '../components/User.js';
import {getQueryParams} from '../utils'

// TODO try getting different user ids to work here for separate logins

// http://rackt.org/redux/docs/basics/ExampleTodoList.html


let userId = getQueryParams(document.location.search).user || "561aecc701caeedd0b93ea97";

class App extends React.Component {
  render() {
    return (
      <div>
        <Relay.RootContainer Component={User} route={new AppHomeRoute({userId: userId})}/>  
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSong: state.currentSong
  }
}

export default connect(mapStateToProps)(App);