import { connect } from 'react-redux';
// import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import Relay from 'react-relay';
import React from 'react';
import { bindActionCreators } from 'redux';
import AppHomeRoute from '../routes/AppHomeRoute';
import User from '../components/User.js';
import {getQueryParams} from '../utils'
import * as AppActions from '../actions/current';

import HomeIn from '../components/HomeIn';
import HomeOut from '../components/HomeOut';

// TODO try getting different user ids to work here for separate logins

// http://rackt.org/redux/docs/basics/ExampleTodoList.html

let userId = getQueryParams(document.location.search).user || '562592cfde07141f228bbd7f';

class App extends React.Component {
  componentDidMount(){
  	//console.log('the beginning', this.props.actions.setSong('thing'));
   this.props.actions.setLogin('562592cfde07141f228bbd7f');
  }
  render() {
  	const { currentState, actions } = this.props;
    let homeArea = currentState.currentUser.id ? <Relay.RootContainer
        Component={HomeIn}
        route={new AppHomeRoute({userId: currentState.currentUser.id})}
        renderFetched={function(data) {
        return (
          <HomeIn {...data} currentState={currentState} actions={actions} />
        );
      }}/> : <HomeOut currentState={currentState} actions={actions} />;
    return (
      <div>
        {homeArea}
      </div>
    );
  }
}

// <Home currentState={currentState} actions={actions} />
// This is where you'll be passing down the userId if it exists?
// App checks for it when its loaded - initially you'll have to login each time
// then you can make it persistant and fetched from local storage
// login will set it, logout will destroy it

// <div>
//   <div>
//     <h1>Current Song: {currentState.currentSong.name}</h1>
//   </div>
//   <Relay.RootContainer
//     Component={User}
//     route={new AppHomeRoute({userId: userId})}
//     renderFetched={function(data) {
//     return (
//       <User {...data} currentState={currentState} actions={actions} />
//     );
// }}/>
// </div>

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