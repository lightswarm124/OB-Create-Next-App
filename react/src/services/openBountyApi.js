export function registerRepository(repo, accountId) {
  // TODO: Add POST request to OB API to register repo
  // If a new Smart Contract is required upon registering the Repository this should be done
  // in the OpenBounty service, which will unlock the master account for deployment
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

export function getMarketBounties() {
  // TODO: ADD GET request to get bounties that are viewable by the general public
  return Promise.resolve([
    {
      repoId: '10270250',
      title: 'Image upload via iOS / Android displayed sideways',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
        unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged. It was popularised in the 1960s with the release of 
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
        software like Aldus PageMaker including versions of Lorem Ipsum.`,
      value: 1000,
      owner: 'Jeff Martin'
    },
    {
      repoId: '24195339',
      title: 'Out of memory/crash when not in debugger',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
        unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged. It was popularised in the 1960s with the release of 
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
        software like Aldus PageMaker including versions of Lorem Ipsum.`,
      value: 2000,
      owner: 'Joe Simpson'
    },
    {
      repoId: '1801829',
      title: 'Zooming before starting record with low quality ',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
        unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      value: 800,
      owner: 'Jane Smith'
    },
    {
      repoId: '757363',
      title: 'Scan barcode in album orientation not works on RNCamera',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
        unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged. It was popularised in the 1960s with the release of 
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
        software like Aldus PageMaker including versions of Lorem Ipsum.`,
      value: 600,
      owner: 'Barnie Morrison'
    },
    {
      repoId: '3214406',
      title: 'Using local file npm package makes app crash when deploying',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
        unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged. It was popularised in the 1960s with the release of 
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
        software like Aldus PageMaker including versions of Lorem Ipsum.`,
      value: 1200,
      owner: 'Bill Dole'
    }
  ]);
}
