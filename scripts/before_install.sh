#!/bin/bash

echo before_install

# Install node.js
sudo apt-add-repository ppa:chris-lea/node.js -y
sudo apt-get update
sudo apt-get install nodejs -y