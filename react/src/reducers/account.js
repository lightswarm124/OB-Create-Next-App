export const SET_ACCOUNT = 'SET_ACCOUNT';
export const RESET_ACCOUNT = 'RESET_ACCOUNT';
import { getAccount, ethToToken, tokenToEth, awardBountyToRecipient } from 'services/web3Api';

const defaultAccount = {};

// reducer for the user's currently selected account
export default function account(state = defaultAccount, action) {
  switch (action.type) {
    case SET_ACCOUNT:
      return action.payload;
    case RESET_ACCOUNT:
      return defaultAccount;
    default:
      return state;
  }
}

export function loadAccount(accountId) {
  return dispatch => {
    return getAccount(accountId).then((account) => {
      dispatch({
        type: SET_ACCOUNT,
        payload: account
      });
      return account;
    });
  };
}

export function ethToken(account, ethAmount) {
  return dispatch => {
    return ethToToken(account, ethAmount).then((account) => {
      dispatch({
        type: SET_ACCOUNT,
        payload: account
      });
      return account;
    });
  }
}

export function tokenEth(account, tokenAmount) {
  return dispatch => {
    return tokenToEth(account, tokenAmount).then((account) => {
      dispatch({
        type: SET_ACCOUNT,
        payload: account
      });
      return account;
    });
  }
}

export function awardBounty(account, recipientId, tokenAmount) {
  return dispatch => {
    return awardBountyToRecipient(account, recipientId, tokenAmount).then((account) => {
      dispatch({
        type: SET_ACCOUNT,
        payload: account
      });
      return account;
    });
  }
}

export function clearAccount() {
  return { type: RESET_ACCOUNT };
}
