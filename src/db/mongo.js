const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;

const connectionURL = 'mongodb://127.0.0.1:27017';
const connectionAltsURL = 'mongodb+srv://admin:<atobsa90>@cluster0.laygj.mongodb.net/<offer>?retryWrites=true&w=majority'
const databaseName = 'offer';

MongoClient.connect(connectionAltsURL , {useNewUrlParser: true}, (err , client) => {
    if (err){
        return console.log('unable to connect to database' + err)
    }
   const db = client.db(databaseName);

})