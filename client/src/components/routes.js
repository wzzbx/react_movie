import Base from './Base.jsx';
import HomePage from './Homepage.jsx';
import Auth from '../auth/Auth.js';

const routes = {

  component: Base,
  childRoutes: [

    {

      path: '/',

      getComponent: (location, cb) => {

        if (Auth.isUserAuthenticated()) {

          cb(null, HomePage);

        } else {
          // u slucaju da zelimo neku drugu landing componentu
          cb(null, HomePage);

        }
      }

    }, {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        replace('/');
      }
    }

  ]
};

export default routes;