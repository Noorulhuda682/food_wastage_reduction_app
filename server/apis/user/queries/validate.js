const emailExistence = require("email-existence"); 
const {validate} = require( 'deep-email-validator');

const validating = async () => {

    let res = await validate({
        email: 'noorulhuda682ddd@gmail.com',
        // sender: 'name@example.org',
        validateRegex: true,
        validateMx: true,
        validateTypo: true,
        validateDisposable: true,
        validateSMTP: true,
      })
    
    // validate('noorulhuda682@gmail.com')

    // let resp = await emailExistence.check('noorulhuda682@gmail.com', async function(error, response){
    //     console.log('res: ', response);
    //     // return response
    // });


  console.log("VA==>",res);

   return "validate"
}

module.exports = validating