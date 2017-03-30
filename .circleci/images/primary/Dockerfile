FROM node:6.10

RUN apt-get -y -qq update
RUN apt-get -y -qq install python3.4-dev sudo
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.4
RUN pip install awscli --upgrade --user
RUN apt-get upgrade