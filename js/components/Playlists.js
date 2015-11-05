import Relay from 'react-relay';
import Playlist from './Playlist.js';
import React from 'react';
import PlaylistForm from './PlaylistForm.js';

// https://github.com/transedward/relay-chat/blob/b6ff3c161b855fe900daca1de74e059de1e1e1e7/js/components/ThreadSection.js

class Playlists extends React.Component {
  constructor(props){
    super(props)
    console.log('Playlists was created');
  }
  render() {
    let user = this.props.user;
    const { actions } = this.props;
    console.log('tried to render Playlists', this.props);
    let playlists = this.props.playlists.edges.map((edge) => {
      return <Playlist key={edge.node.id} playlist={edge.node} actions={actions}/>;
    });

    return (<div>
              <h1>Playlists</h1>
              <PlaylistForm user={user}/>
              <ul>{playlists}</ul>
            </div>);
  }
}

export default Relay.createContainer(Playlists, {
  fragments: {
    playlists: () => Relay.QL`
      fragment on PlaylistConnection {
        edges{
          node{
            title
            id,
            ${Playlist.getFragment('playlist')}
          }
        }
    }`,
    user:() => Relay.QL`
      fragment on User {
        id
        ${PlaylistForm.getFragment('user')},
      }
    `
  }
});

// export default Relay.createContainer(ThreadSection, {
//   fragments: {
//     threads: () => Relay.QL`
//       fragment on ThreadConnection {
//         unreadCount,
//         edges {
//           node {
//             id,
//             ${ThreadListItem.getFragment('thread')}
//           }
//         }
//       }
//     `,
//     viewer: () => Relay.QL`
//       fragment on User {
//         ${ThreadListItem.getFragment('viewer')}
//       }
//     `
//   }
// });