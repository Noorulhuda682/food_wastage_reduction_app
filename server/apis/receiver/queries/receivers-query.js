const Receiver = require("../../../models/Receiver");

const receivers = async  (_, __, { dataSources }) => {

    let recei = await  Receiver.find() 
      
    return recei.reverse();
} 

module.exports = receivers;

