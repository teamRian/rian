#!/usr/bin/env bash

cd ~/rian
file="docker-compose.yml"
if [ -f "$file" ]
then
	echo "$file found, close docker and remove existing files"
	sudo docker-compose down
	printf 'y' | sudo docker-compose rm --all
	sudo rm -rf ~/rian
	mkdir -p ~/rian
else
	echo "$file not found, continue download bundle"
	sudo rm -rf ~/rian
	mkdir -p ~/rian
fi
sudo service docker restart



