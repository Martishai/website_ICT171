#!/bin/bash

echo "Recent SSH login sessions:"
last -i | grep -E "pts|tty" | head -n 10
