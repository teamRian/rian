#!/usr/bin/env bash

# if [ "${CIRCLE_BRANCH}" == "master" ]; then
	aws s3 sync ~/rian s3://rian-s3-dev/ --delete
# fi
