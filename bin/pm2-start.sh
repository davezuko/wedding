#!/bin/bash
pm2 start npm --wait-ready -i 1 --name "dev.davidandjackiewedding.com" -- run serve
