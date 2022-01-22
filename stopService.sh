#!/bin/sh
docker-compose --context qa1 down
# docker-compose --context qa2 down
docker-compose --context qa3 down
docker-compose --context qa4 down
if [[ "$1" == "--delete" ]];  then
  docker --context qa1 rmi -f $(docker --context qa1 images -aq)
  docker --context qa3 rmi -f $(docker --context qa3 images -aq)
  docker --context qa4 rmi -f $(docker --context qa4 images -aq)
fi