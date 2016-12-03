var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var dbUrl = 'mongodb://localhost:27017/localAuthTest';

// var replicaSetUrl = 'mongodb://localhost:27021,localhost:27022,localhost:27023/replicasetTest?replicaSet=replica';
var replicaSetUrl = 'mongodb://10.0.0.26:27017,10.0.0.55:27017,10.0.0.56:27017/replicasetTest?replicaSet=replica';
var replicaSetOptions = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    replset: { rs_name: 'replica' }
};

module.exports = {
    connect : function(){
        // mongoose.connect(dbUrl);
        mongoose.connect(replicaSetUrl, replicaSetOptions);
    },
    connection : mongoose.connection
};
