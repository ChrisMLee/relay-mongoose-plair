import React from 'react';
import Relay from 'react-relay';

export default class HeaderLoggedOut extends React.Component {
  constructor(props){
    super(props);
    this.state = {userId: ''};
  }
  componentDidMount(){
  	//console.log('the beginning', this.props.actions.setSong('thing'));
  }
  handleChange = (event) => {
    this.setState({userId:event.target.value});
  }
  handleKeyDown = (event) => {
    let ENTER_KEY_CODE = 13;
    let ESC_KEY_CODE = 27;

    if(event.keyCode === ENTER_KEY_CODE){
      this.enterLogin();
    }
  }
  enterLogin = () => {
    this.props.actions.setLogin(userId);
  };
  render() {
  	const { currentState, actions } = this.props;
    let userId = this.state.userId ? this.state.userId : '';
    return (
      <div>
          <h1>Plair</h1>
      		<h3>Log In Now</h3>
          <div>
            <input onKeyDown={this.handleKeyDown} onChange={this.handleChange} value={userId} type="text" placeholder="Enter User Id" />
            <button onClick={() => {actions.setLogin(userId);} }>Add</button>
          </div>
      </div>
    );
  }
}

// in the future, there could be some kind of intermediate state
// logged in, hasn't logged in before, logged out