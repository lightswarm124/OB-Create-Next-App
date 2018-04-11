export const SET_REPOS = 'SET_REPOS';
export const ADD_REPO = 'ADD_REPO';
export const REMOVE_REPO = 'REMOVE_REPO';
export const RESET_REPOS = 'RESET_REPOS';
import { getRegisteredRepositories, registerRepository, unregisterRepository } from 'services/openBountyApi';

const defaultRepos = [];

export default function registeredRepos(state = defaultRepos, action) {
  switch (action.type) {
    case ADD_REPO:
      return [...state, action.payload];
    case REMOVE_REPO:
      const i = state.indexOf(action.payload.id);
      return [...state.slice(0, i), ...state.slice(i + 1, state.length)];
    case RESET_REPOS:
      return defaultRepos;
    default:
      return state;
  }
}

export function loadRegisteredRepos(accountId) {
  return dispatch => {
    return getRegisteredRepositories(accountId).then((repos) => {
      dispatch({
        type: SET_REPOS,
        payload: repos
      });
      return repos;
    });
  };
}

export function registerRepo(repo, accountId) {
  return dispatch => {
    return registerRepository(repo, accountId).then((repo) => {
      dispatch({
        type: ADD_REPO,
        payload: repo.id
      });
      return repo;
    });
  };
}

export function unregisterRepo(repo, accountId) {
  return dispatch => {
    return unregisterRepository(repo, accountId).then((repo) => {
      dispatch({
        type: REMOVE_REPO,
        payload: repo
      });
      return repo;
    });
  };
}

export function clearRepos() {
  return { type: RESET_REPOS };
}
