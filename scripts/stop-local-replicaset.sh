#! /bin/bash

#stop all replica set instances on the current host
ps aux | awk '/\-\-replSet/ {print "kill", $2}' | while read x; do `$x`; done
