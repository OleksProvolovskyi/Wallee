#!/bin/bash

docker build -t playwright-tests .

docker run --rm playwright-tests