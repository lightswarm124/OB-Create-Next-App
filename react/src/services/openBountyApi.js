export function registerRepository(repo, accountId) {
  // TODO: Add POST request to OB API to register repo
  return Promise.resolve(repo);
}

export function unregisterRepository(repo, accountId) {
  // TODO: ADD DELETE request to OB API to unregister repo
  return Promise.resolve(repo);
}

export function getRegisteredRepositories(accountId) {
  // TODO: ADD GET request to get all registered repos for the user
  return Promise.resolve([]);
}

export function getBounties(repo, status) {
  // TODO: ADD GET requst to get all bounties for the repo with status, status could be Open, Close etc
  return Promise.resolve([]);
}

export function addBounty(repo, bounty) {
  // TODO: ADD POST request to add a bounty to the repo
  return Promise.resolve(bounty);
}

export function removeBounty(repo, bounty) {
  // TODO: ADD DELETE request to remove bounty from the repo
  return Promise.resolve(bounty);
}
