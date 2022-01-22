#!/bin/bash
if [[ "$1" == "--build" ]];  then
  docker-compose --context qa1 up -d --force-recreate -V
  docker-compose -f docker-compose.noNginx.yml --context qa2 up -d  --force-recreate -V
else
  docker-compose --context qa1 up -d
  docker-compose -f docker-compose.noNginx.yml --context qa2 up -d
fi
