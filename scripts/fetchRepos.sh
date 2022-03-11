#!/usr/bin/env bash

repos=("somerepo" "someotherrepos")

for repo in "${repos[@]}"
  do
    python3 ../lib/xkcd2347.py user-or-org/$repo
done
