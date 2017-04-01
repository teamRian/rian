#!/usr/bin/env bash

cd ~/rian
file="docker-compose.yml"
if [ -f "$file" ]
then
	echo "$file found, close docker and remove existing files"
	sudo docker-compose down
	sudo rm -rf ~/rian/*
else
	echo "$file not found, continue download bundle"
	sudo rm -rf ~/rian/*
fi



