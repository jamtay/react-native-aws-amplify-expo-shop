echo 'Setting development environment back to development - running "npm run env:development"'
npm run env:development
REPO_PATH="$(git rev-parse --show-toplevel)"
git add ${REPO_PATH}/app.json
