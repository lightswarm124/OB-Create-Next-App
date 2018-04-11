export const SET_ACCOUNTS = 'SET_ACCOUNTS';
export const RESET_ACCOUNTS = 'RESET_ACCOUNTS';
import { getAccounts } from 'services/web3Api';

const defaultAccounts = [];

// Reducers for available accounts from the web3 provider
export default function accounts(state = defaultAccounts, action) {
  switch (action.type) {
    case SET_ACCOUNTS:
      return action.payload;
    case RESET_ACCOUNTS:
      return defaultAccounts;
    default:
      return state;
  }
}

export function loadAccounts() {
  return dispatch => {
    return getAccounts().then((accounts) => {
      dispatch({
        type: SET_ACCOUNTS,
        payload: accounts
      });
      return accounts;
    });
  };
}

export function clearAccounts() {
  return { type: RESET_ACCOUNTS };
}
