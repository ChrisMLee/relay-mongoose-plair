import storage from './storage';
import { SET_LOGIN, LOGOUT } from '../constants/ActionTypes.js';

export default function storageMiddleware(){
  return next => action =>{
    switch (action.type) {
      case SET_LOGIN:
        storage.set('currentUser', action.userId);
        return next(action);
      case LOGOUT:
        storage.set('currentUser', '');
        return next(action);
      default:
        return next(action);
    }
  }

}


// export default function createLogger({ getState }) {
//   return (next) => 
//     (action) => {
//       const console = window.console;
//       const prevState = getState();
//       const returnValue = next(action);
//       const nextState = getState();
//       const actionType = String(action.type);
//       const message = `action ${actionType}`;
//       console.log(`%c prev state`, `color: #9E9E9E`, prevState);
//       console.log(`%c action`, `color: #03A9F4`, action);
//       console.log(`%c next state`, `color: #4CAF50`, nextState);
//       return returnValue;
//     };
// }

// export default function promiseMiddleware() {
//   return next => action => {
//     const { promise, type, ...rest } = action;
   
//     if (!promise) return next(action);
   
//     const SUCCESS = type;
//     const REQUEST = type + '_REQUEST’;
//     const FAILURE = type + '_FAILURE’;
//     next({ ...rest, type: REQUEST });
//     return promise
//       .then(res => {
//         next({ ...rest, res, type: SUCCESS });
        
//         return true;
//       })
//       .catch(error => {
//         next({ ...rest, error, type: FAILURE });
        
//         // Another benefit is being able to log all failures here 
//         console.log(error);
//         return false;
//       });
//    };
// }