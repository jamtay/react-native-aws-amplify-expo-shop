echo 'Setting development environment back to development - running "run env:development"'
npm run env:development
REPO_PATH="$(git rev-parse --show-toplevel)"
echo ${REPO_PATH}
git add ${REPO_PATH}/app.json
