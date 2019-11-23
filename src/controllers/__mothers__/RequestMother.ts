import fs = require('fs')
import path = require('path')

const anEmptyRequest = { headers: { } }
const aGitlabEvent = { headers: { 'x-gitlab-event': 'irrelevant-gitlab-header' } }

const payload = fs.readFileSync(path.join(__dirname, 'pull_request_gitlab.json'), 'utf8')
const body = JSON.parse(payload)
const aGitlabPullRequest = { headers: { 'x-gitlab-event': 'Merge Request Hook' }, body }

export { anEmptyRequest, aGitlabEvent, aGitlabPullRequest }
