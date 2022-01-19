#!/bin/bash
if [[ "$1" == "build" ]];  then
  docker-compose --context qa1 up --build -d
  docker-compose -f docker-compose.noNginx.yml --context qa2 up --build -d
else
  docker-compose --context qa1 up -d
  docker-compose -f docker-compose.noNginx.yml --context qa2 up -d
fi