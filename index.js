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

const fieldsInput = core.getInput('fields')
const fields = fieldsInput ? fieldsInput.split(',') : []

const maxResultsInput = parseInt(core.getInput('maxResults'), 10)
const options = {
  maxResults: !isNaN(maxResultsInput) ? maxResultsInput : 50
}

if (fields.length) {
  options.fields = fields
}

jiraClient.searchJira(core.getInput('jql'), options).then(response => {
  const issues = !fields.length ? filterCustomIssueFields(response.issues) : response.issues
  core.setOutput('issueData', JSON.stringify({ issues, quantity: issues.length }))
  console.log('Completed search')
}).catch(err => {
  core.setFailed(`An error occurred getting data from JIRA: ${err}`)
})
