#!/bin/bash

echo after_install

cd /opt/webapp/gateway

yarn
yarn build
yarn start