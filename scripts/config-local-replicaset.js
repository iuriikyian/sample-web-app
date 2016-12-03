var config = {
    _id : 'replica',
    members : [
        {
            _id : 1,
            host : 'localhost:27021',
            // priority : 1,
            // slaveDelay : 5
        },
        {
            _id : 2,
            host : 'localhost:27022',
            // priority : 1,
            // slaveDelay : 5
        },
        {
            _id : 3,
            host : 'localhost:27023',
            // priority : 1,
            // slaveDelay : 5
        },
        {   // arbiter 1
            _id : 4,
            host : 'localhost:27030',
            arbiterOnly : true,
            priority : 0,
            // slaveDelay : 5
        },
        {   // arbiter 2
            _id : 5,
            host : 'localhost:27031',
            arbiterOnly : true,
            priority : 0,
            // slaveDelay : 5
        },
    ]
};

rs.initiate(config);
// rs.reconfig(config);
rs.status();
