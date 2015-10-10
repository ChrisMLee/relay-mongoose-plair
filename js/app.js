import User from './components/User.js';
import AppHomeRoute from './routes/AppHomeRoute';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

let userId = getQueryParams(document.location.search).user || "56186b4e4752ec2116772362";

ReactDOM.render(
  <Relay.RootContainer
    Component={User}
    //TODO Update userId
    route={new AppHomeRoute({userId: userId})}
  />,
  document.getElementById('root')
);




function getQueryParams(qs) {
  qs = qs.split('+').join(' ');

  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}