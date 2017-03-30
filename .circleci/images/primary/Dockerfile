FROM node:boron

RUN apt-get update 
RUN apt-get install -y sudo && apt-get upgrade
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | sudo python
RUN apt-get install -y python-dev && apt-get upgrade
RUN apt-get install -y zip && apt-get upgrade
RUN sudo pip install --upgrade --user awscli