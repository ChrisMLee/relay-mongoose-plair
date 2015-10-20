import React from 'react';
import HeaderLoggedOut from './HeaderLoggedOut';

export default class HomeOut extends React.Component {
  componentDidMount(){
  	//console.log('the beginning', this.props.actions.setSong('thing'));
  }
  render() {
  	const { currentState, actions } = this.props;
    return (
      <div>
      	<HeaderLoggedOut currentState={currentState} actions={actions}/>
      </div>
    );
  }
}