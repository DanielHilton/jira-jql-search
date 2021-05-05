const JiraApi = require('jira-client')

function setupJiraClient () {
  if (!process.env.JIRA_API_TOKEN) throw new Error('Set JIRA_API_TOKEN environment variable')
  if (!process.env.JIRA_USER_EMAIL) throw new Error('Set JIRA_USER_EMAIL environment variable')
  if (!process.env.JIRA_HOST) throw new Error('Set JIRA_HOST environment variable')

  return new JiraApi({
    protocol: 'https',
    host: process.env.JIRA_HOST,
    username: process.env.JIRA_USER_EMAIL,
    password: process.env.JIRA_API_TOKEN,
    apiVersion: 2,
    strictSsl: true
  })
}

module.exports = { setupJiraClient }