var api = require('etherscan-api').init('RFX1H8H3YA9EG2MTHNZZUHEEQVB9RDD4TB');
var balance = api.account.balance('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae');
txlist = api.account.txlist('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae', 1, 'latest', 'asc');
txlist.then(function(txlistData){
  console.log(txlistData)
});
balance.then(function(balanceData){
  console.log(balanceData);

});
