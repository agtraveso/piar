
const anEmptyRequest = { headers: { } }
const aGitlabEvent = { headers: { 'x-gitlab-event': 'irrelevant-gitlab-header' } }
const aGitlabPullRequest = { headers: { 'x-gitlab-event': 'Merge Request Hook' } }

export { anEmptyRequest, aGitlabEvent, aGitlabPullRequest }
