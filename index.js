const core = require('@actions/core')
const { setupJiraClient } = require('./helpers/jira')
const jiraClient = setupJiraClient()

async function run () {
  try {
    const apiResponse = await jiraClient.searchJira(core.getInput('jql'))

    const fields = core.getInput('fields') ? core.getInput('fields').split(',') : [];
    const filterFieldsOrDefault = key => fields && fields.length ? fields.includes(key) : !key.startsWith('customfield')

    const issues = apiResponse.issues.map(issue => {
      issue.fields = Object.keys(issue.fields)
        .filter(filterFieldsOrDefault)
        .reduce((obj, key) => {
          obj[key] = issue.fields[key]

          return obj
        }, {})

      return issue
    })

    core.setOutput('issueData', JSON.stringify({ issues, quantity: issues.length }))
  } catch (err) {
    console.error(`An error occurred getting data from JIRA: ${err}`)
  }
}

run().then(() => {
  console.log('Completed search')
})
