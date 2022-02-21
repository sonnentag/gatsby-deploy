#!/usr/bin/env bash

repos=("AskRI" "bcbs.com" "sailorsforthesea.org" "onepercentamerica.org-drupal" "little-trees.eu")

for repo in "${repos[@]}"
  do
    python3 lib/xkcd2347.py oomphinc/$repo
done
