#!/bin/bash

#stop replica set instances on the current host
DB_DIR=~/sandbox//sample-web-app-replica-set
LOGS_DIR=${DB_DIR}/logs
MONGO_BIN=~/tools/bin
MONGOD=${MONGO_BIN}/mongod
REPLICA_NAME=replica

${MONGOD} --replSet ${REPLICA_NAME} --logpath ${LOGS_DIR}/rs1.log --dbpath ${DB_DIR}/db1 --port 27021 --fork
${MONGOD} --replSet ${REPLICA_NAME} --logpath ${LOGS_DIR}/rs2.log --dbpath ${DB_DIR}/db2 --port 27022 --fork
${MONGOD} --replSet ${REPLICA_NAME} --logpath ${LOGS_DIR}/rs3.log --dbpath ${DB_DIR}/db3 --port 27023 --fork

# arbiters
${MONGOD} --replSet ${REPLICA_NAME} --logpath ${LOGS_DIR}/arb0.log --dbpath ${DB_DIR}/arb0 --port 27030 --nojournal --smallfiles --fork
${MONGOD} --replSet ${REPLICA_NAME} --logpath ${LOGS_DIR}/arb1.log --dbpath ${DB_DIR}/arb1 --port 27031 --nojournal --smallfiles --fork
