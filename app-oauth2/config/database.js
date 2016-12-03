var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var dbUrl = 'mongodb://localhost:27017/localAuthTest';

// var replicaSetUrl = 'mongodb://localhost:27021,localhost:27022,localhost:27023/replicasetTest?replicaSet=replica';
var replicaSetUrl = 'mongodb://srv1.web.com:27017,srv2.web.com:27017,srv3.web.com:27017/replicasetTest?replicaSet=replica';
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
