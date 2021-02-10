'use strict'

const web3 = require('./web3')
const Response = require('./helpers');


module.exports = {

 async convert (req, res) {  
     
    const {address, convertTo} = req.body;

    console.log(address, convertTo)

    // check for data field is passed
	if (!address) {
		return Response.sendErrorResponse({
			res, status: 'error', message: 'Address field is required.', statusCode: 400, responseBody: null,
		})
    }
    
    // check for rule field is passed
    if (!convertTo) {
		return Response.sendErrorResponse({
			res, status: 'error', message: 'convertTo field is required.', statusCode: 400, responseBody: null,
		})
	}

    switch (convertTo) {
        case "toLower":

            if (web3.utils.isAddress(address) && (address == address.toUpperCase() || address == address.toLowerCase() || web3.utils.checkAddressChecksum(address)))
            {
                let lowerCaseAddress = await address.toLowerCase()
                return Response.sendResponse({res,status: 'success', message: 'Successfully converted to lower case', responseBody: lowerCaseAddress  })
             
            }else{
                Response.sendErrorResponse({res, status: 'error', message: 'Not a valid address', responseBody: null  })
        
            }
            
            break;

        case "toUpper":
            if (web3.utils.isAddress(address) && convertTo === "toUpper" && (address == address.toLowerCase() || address == address.toUpperCase() || web3.utils.checkAddressChecksum(address)))
            {
                // The character is uppercase
                let upperCaseAddress = await address.toUpperCase()
                console.log(upperCaseAddress)
                return Response.sendResponse({res, status: 'success', message: 'Successfully converted to upper case', responseBody: upperCaseAddress  })
            
            }else {
                Response.sendErrorResponse({res, status: 'error', message: 'Not a valid address', responseBody: null  })
            }
               
        break;

        case "toCheckSum":
            if (web3.utils.isAddress(address) && (address == address.toUpperCase() || address == address.toLowerCase()))
            
            {  
                console.log(web3.utils.isAddress(address), '---', (address == address.toUpperCase() || address == address.toLowerCase()), '-----1')
                const checkSumAddress = web3.utils.toChecksumAddress(address)
        
                console.log(checkSumAddress, web3.utils.checkAddressChecksum(checkSumAddress), '----2')
        
                if(checkSumAddress && web3.utils.checkAddressChecksum(checkSumAddress)) {
                    return Response.sendResponse({res, status: 'success', message: 'Successfully converted to valid checkSum', responseBody: checkSumAddress  })
                  
                }
        
                return Response.sendErrorResponse({res,status: 'error', message: 'InvalidcheckSum', responseBody: null  })
                
            }
            else{
                Response.sendErrorResponse({res, status: 'error', message: 'Not a valid address', responseBody: null  })
        
            }
            
        break;
    
        default:
            Response.sendErrorResponse({res, status: 'error', message: 'Not a valid address', responseBody: null  })
            break;
    }
    
},

async verifyChecksum (req, res) {

    const {address}  = req.query

    console.log(address, web3.utils.isAddress(address))

    if(web3.utils.isAddress(address)){
        const checkSumAddress = web3.utils.toChecksumAddress(address)
        
        if(checkSumAddress && web3.utils.checkAddressChecksum(checkSumAddress)) {
            return Response.sendResponse({res, status: 'success', message: 'valid checksum :)', responseBody: checkSumAddress  })
          
        }
    
        return Response.sendErrorResponse({res,status: 'error', message: 'Invalid checksum', responseBody: null  })
        
    }
   return Response.sendErrorResponse({res, status: 'error', message: 'Not a valid address', responseBody: null  })

},

}


