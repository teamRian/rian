FROM node:boron

RUN apt-get update 
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python
RUN apt-get install -y sudo zip python-dev && apt-get upgrade
RUN pip install --upgrade --user awscli