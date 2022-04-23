#!/usr/bin/env python3

import os
from github import Github

# Check for the GitHub access token
pat = os.environ.get("GITHUB_PAT")
if pat is None:
  print("Error: a GitHub access token must be provided in the GITHUB_PAT envvar!")
  exit(1)

# Configure values
github_api = Github(pat)
org = "oomphinc"
files = ["package-lock.json", "composer.json"]
directory = "packageinfo"

# Retrieve the files of interest from the organization repositories
# repos = github_api.get_organization(org).get_repos()
with open('./repos.txt') as f:
  repos = f.read().splitlines()
for repo in repos:
  print("Retrieving files from " + repo.name)
  os.makedirs(directory + "/" + repo.name, exist_ok=True)
  for file in files:
    local_file = open(directory + "/" + repo.name + "/" + file, "w")
    try:
      file_contents = repo.get_contents(file)
      local_file.write(file_contents.decoded_content.decode())
    except github.GithubException:
      print("Repo " + repo.name + " does not have the file " + file)
    local_file.close()
