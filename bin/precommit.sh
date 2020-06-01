echo 'Setting development environment back to mock env - running "env:mock"'
npm run env:mock
REPO_PATH="$(git rev-parse --show-toplevel)"
git add ${REPO_PATH}/app.json
