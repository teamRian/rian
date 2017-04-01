#!/usr/bin/env bash

cd ~/rian
sudo chmod +x ./scripts/aws/BeforeDockerCompose.sh
sudo docker-compose up --build -d
