import { injectReducer } from '../store/reducers';
import HomeRoute from './Home';
import AccountRoute from './Account';
import RepositoriesRoute from './Repositories';
import RepositoryRoute from './Repository';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
export const createRoutes = (store) => (
  [ {
    path: '/',
    getComponent (nextState, cb) {
      const accountsReducer = require('reducers/accounts').default;
      injectReducer(store, { key: 'accounts', reducer: accountsReducer });
      const registeredReposReducer = require('reducers/registeredRepos').default;
      injectReducer(store, { key: 'registeredRepos', reducer: registeredReposReducer });
      const CoreLayout = require('../components/CoreLayout').default;
      cb(null, CoreLayout);
    },
    indexRoute: HomeRoute,
    childRoutes: [
      AccountRoute,
      RepositoriesRoute,
      RepositoryRoute
    ]
  }
  ]);

export default createRoutes;
