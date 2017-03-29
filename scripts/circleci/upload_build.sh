#!/usr/bin/env bash

# if [ "${CIRCLE_BRANCH}" == "master" ]; then
apt-get install sudo
sudo apt-get install -y python-pip
sudo pip install awscli
aws s3 sync ~/rian s3://rian-s3-dev/ --delete
# fi
