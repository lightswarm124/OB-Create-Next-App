export function registerRepository(repo, accountId) {
  return Promise.resolve(repo);
}

export function unregisterRepository(repo, accountId) {
  return Promise.resolve(repo);
}

export function getRegisteredRepositories(accountId) {
  return Promise.resolve([]);
}

export function awardBounty(prId, accountId) {
  return Promise.resolve(prId);
}
