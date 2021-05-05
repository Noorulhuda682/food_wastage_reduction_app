const emailExistence = require("email-existence"); 

const validate = async () => {

    await emailExistence.check('noorulhuda682@gmail.com', async function(error, response){
        console.log('res: '+response);
        return response
    });

  console.log("VA==>");

   return "validate"
}

module.exports = validate