import axios from 'axios';

const GITHUB_API_URL = __GITHUB_API_URL__;

export function searchRepositories(searchTerm) {
  return axios.get(GITHUB_API_URL + '/search/repositories?q=' + searchTerm);
}

export function getRepository(id) {
  return axios.get(GITHUB_API_URL + '/repositories/' + id);
}

export function getPullRequestsForRepository(id, state) {
  return axios.get(GITHUB_API_URL + '/repositories/' + id + '/pulls?state=' + state);
}
