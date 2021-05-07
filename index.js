const core = require('@actions/core')
const { setupJiraClient } = require('./helpers/jira')
const jiraClient = setupJiraClient()

const filterCustomIssueFields = (issues) => {
  return issues.map(issue => {
    issue.fields = Object.keys(issue.fields)
      .filter(key => !key.startsWith('customfield'))
      .reduce((obj, key) => {
        obj[key] = issue.fields[key]

        return obj
      }, {})

    delete issue.expand
    return issue
  })
}

const fields = core.getInput('fields') ? core.getInput('fields').split(',') : []
const jql = core.getInput('jql')

jiraClient.searchJira(jql, fields.length ? { fields } : {})
  .then(response => {
    const issues = !fields.length ? filterCustomIssueFields(response.issues) : response.issues
    core.setOutput('issueData', JSON.stringify({ issues, quantity: issues.length }))
    console.log('Completed search')
  })
  .catch(err => {
    core.setFailed(`An error occurred getting data from JIRA: ${err}`)
  })
