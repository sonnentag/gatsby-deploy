#!/usr/bin/env python3

# This script retrieves the repositories in a given organization and
# evaluates them, publishing the results. You must provide a GitHub
# Personal Access Token in an environment variable called GITHUB_PAT,
# and this token must have full repository access in the target organization.

import ast
import os
import json

# Configure values
files = {"composer.json":"require", "package-lock.json":"dependencies"}

directory = "packageinfo"

# Retrieve the files of interest from the organization repositories
with open('repos.txt') as f:
  repos = f.read().splitlines()
for repo in repos:
  # Retrieve the files of interest from the organization repositories
  item = [] 
  for file in files:
    try:
      with open(directory + "/" + repo + "/" + file, "r") as local_file:
        data = json.load(local_file)
      for k,v in data[files[file]].items():
        result = {} 
        result["package"] = k
        result["version"] = v["version"] if files[file] == "dependencies" else v
        result["installer"] = file.split(".")[0]
        result["repo"] = repo
        if result:
          item.append(result)
    except Exception as e:
      # print(e)
      pass

    if item: 
        object = {"packages": item}

  if object:
    os.remove("../src/data/" + repo + ".json")
    with open("../src/data/" + repo + ".json", 'w') as file:
      file.write(str(object).replace("'", "\"") + '\n')
