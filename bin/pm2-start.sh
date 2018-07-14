#!/bin/bash
set -e
pm2 start bin/start.js --wait-ready -i max --name "dev.davidandjackiewedding.com" --node-args "-r esm -r dotenv/config"
