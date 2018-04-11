import axios from 'axios';

const GITHUB_API_URL = __GITHUB_API_URL__;

export function searchRepositories(searchTerm) {
  return axios.get(GITHUB_API_URL + '/search/repositories?q=' + searchTerm);
}
