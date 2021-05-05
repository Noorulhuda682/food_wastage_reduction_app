const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://noor:noor@cluster0-im4zu.mongodb.net/FWR?retryWrites=true&w=majority';

mongoose.connect(mongoURI,{useNewUrlParser: true,useUnifiedTopology: true });

module.exports = mongoose;