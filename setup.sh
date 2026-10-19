#!/usr/bin/env sh
# Install idra-taste and the plugins it works with, at user scope.
# Run from anywhere: sh setup.sh
set -e
HERE=$(cd "$(dirname "$0")" && pwd)

claude plugin marketplace add pbakaus/impeccable || true
claude plugin marketplace add Leonxlnx/taste-skill || true
claude plugin marketplace add "$HERE" || true

claude plugin install frontend-design@claude-plugins-official
claude plugin install impeccable@impeccable
claude plugin install taste-skill@taste-skill
claude plugin install idra-taste@idra-taste

claude plugin list
