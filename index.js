const core = require('@actions/core')
const { setupJiraClient } = require('./helpers/jira')

async function run () {
  const jiraClient = setupJiraClient()

  const apiResponse = await jiraClient.searchJira(core.getInput('jql'))

  const issues = apiResponse.issues.map(issue => {
    issue.fields = Object.keys(issue.fields)
      .filter(key => !key.startsWith('customfield'))
      .reduce((obj, key) => {
        obj[key] = issue.fields[key]

        return obj
      }, {})

    return issue
  })

  core.setOutput('issueData', JSON.stringify({ issues, quantity: issues.length }))
}

run()
