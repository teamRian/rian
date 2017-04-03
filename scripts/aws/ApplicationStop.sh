#!/usr/bin/env bash

cd ~/rian
file="docker-compose.yml"
if [ -f "$file" ]
then
	echo "$file found, close docker and remove existing files"
	sudo docker-compose down
	yes | sudo docker system prune
	sudo rm -rf ~/rian
	mkdir -p ~/rian
else
	echo "$file not found, continue download bundle"
	yes | sudo docker system prune
	sudo rm -rf ~/rian
	mkdir -p ~/rian
fi
sudo service docker restart



