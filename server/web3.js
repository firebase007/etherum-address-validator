'use strict'

const Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:3001'));

module.exports = web3;