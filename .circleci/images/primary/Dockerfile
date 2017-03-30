FROM node:boron

RUN apt-get update 
RUN apt-get install -y python-pip && apt-get upgrade
RUN apt-get install -y python-dev && apt-get upgrade
RUN apt-get install -y sudo && apt-get upgrade
RUN apt-get install -y zip && apt-get upgrade
RUN apt-get upgrade
RUN sudo pip install --upgrade --user awscli