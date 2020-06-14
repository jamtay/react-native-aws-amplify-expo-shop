#!/bin/sh

REPO_PATH="$(git rev-parse --show-toplevel)"
gitleaksEnabled=$(git config --bool hooks.gitleaks)
cmd="gitleaks --repo-path=${REPO_PATH} --verbose --redact --pretty"
if [ $gitleaksEnabled=="true" ]; then
    $cmd
    if [ $? -eq 1 ]; then
cat <<\EOF
Error: gitleaks has detected sensitive information in your changes.
If you know what you are doing you can disable this check using:
    git config hooks.gitleaks false
[ERROR ERROR ERROR]
[ERROR ERROR ERROR]
[ERROR ERROR ERROR]
[ERROR ERROR ERROR] Unable to commit. Resetting softly the last commit. See above log for error
EOF
git reset --soft HEAD^1
exit 1
    fi
fi
