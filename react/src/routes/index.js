import { injectReducer } from '../store/reducers';
import HomeRoute from './Home';
import AccountRoute from './Account';
import RepositoriesRoute from './Repositories';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
export const createRoutes = (store) => (
  [ {
      path: '/',
      getComponent (nextState, cb) {
        const CoreLayout = require('../components/CoreLayout').default;
        cb(null, CoreLayout);
      },
      indexRoute: HomeRoute,
      childRoutes: [
        AccountRoute,
        RepositoriesRoute
      ]
    }
  ]);

export default createRoutes;
