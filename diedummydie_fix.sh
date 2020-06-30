#!/bin/zsh

git filter-branch -f --env-filter "
    GIT_AUTHOR_NAME='serif'
    GIT_AUTHOR_EMAIL='vrenna@live.com'
    GIT_COMMITTER_NAME='serif'
    GIT_COMMITTER_EMAIL='vrenna@live.com'
  " HEAD
