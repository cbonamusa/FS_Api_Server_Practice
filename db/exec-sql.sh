#!/bin/sh
docker exec -it db_db_1 psql -U admin forumsite -f $1