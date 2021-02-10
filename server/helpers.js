const createKeccakHash = require('keccak')
const web3 = require('./web3')

module.exports = {
	sendResponse({
		res, statusCode = 200, message = 'success', responseBody,
	}) {
		res.status(statusCode).send({
			data: responseBody,
			status: true,
			message,
		})
	},

	sendErrorResponse({
		res, statusCode = 500, message = 'error', responseBody,
	}) {
		res.status(statusCode).send({
			data: responseBody,
			status: false,
			message,
		})
    },
    
    //Check if address is checksum
 isAddress (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        address = address.replace('0x','');
        var addressHash = web3.sha3(address.toLowerCase());

        for (var i = 0; i < 40; i++ ) { 
            // the nth letter should be uppercase if the nth digit of casemap is 1
            if ((parseInt(addressHash[i], 16) > 8 && address[i].toUpperCase() != address[i]) || (parseInt(addressHash[i], 16) <= 8 && address[i].toLowerCase() != address[i])) {
                return false;
            }
        }
        return true;
    }
},

 toChecksumAddress (address) {
    address = address.toLowerCase().replace('0x', '')
    var hash = createKeccakHash('keccak256').update(address).digest('hex')
    var ret = '0x'
  
    for (var i = 0; i < address.length; i++) {
      if (parseInt(hash[i], 16) >= 8) {
        ret += address[i].toUpperCase()
      } else {
        ret += address[i]
      }
    }
  
    return ret
  },

  // Make a checksum address 2
 toChecksumAddress (address) {    
    address = address.toLowerCase().replace('0x','');
    var addressHash = web3.sha3(address);
    var checksumAddress = '0x';

    for (var i = 0; i < address.length; i++ ) { 
        // If ith character is 9 to f then make it uppercase 
        if (parseInt(addressHash[i], 16) > 8) {
          checksumAddress += address[i].toUpperCase();
        } else {
            checksumAddress += address[i];
        }
    }
    return checksumAddress;
    
},


}