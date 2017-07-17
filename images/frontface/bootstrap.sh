#!/bin/bash

# ...env
mkdir -p /$PROJECT/.env
source /usr/local/bin/virtualenvwrapper.sh
mkvirtualenv $PROJECT
pip install -r /tmp/requirements.txt

# ...data
mkdir -p /$PROJECT/.data

# # ...log
# mkdir -p /$PROJECT/.logs
# echo '' > /$PROJECT/.logs/synchro.log
