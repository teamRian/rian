FROM ceruberu/rian-container:0.0.2
ADD . /rian
WORKDIR /rian
CMD ["./wait-for-it.sh","mongodb:27017","--","yarn", "run", "start:docker"]
