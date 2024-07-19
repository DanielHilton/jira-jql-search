# JIRA JQL Search GitHub Action

This action searches JIRA for the issues that match the JQL passed in, and returns the results in a JSON array.

## Donation
If you find this action useful, feel free to donate to my Ethereum address, `0xe3f51a4a8dea84a2266e403750ff8363db5e690f`.

## Action Information

### Environment Variables 🔧
🚨 **All variables are required** 🚨

* `JIRA_HOST` - the hostname of your JIRA instance
  * e.g. `stark-industries.atlassian.net`
* `JIRA_API_TOKEN` - An access token from JIRA. Configure them [here](https://id.atlassian.com/manage-profile/security/api-tokens)
* `JIRA_USER_EMAIL` - The email of the user that generate `JIRA_API_TOKEN`

### Inputs 

* `jql` _(required)_ - A JIRA JQL query
* `fields` - A comma-separated list of fields to map out of the issue data
  * If not supplied, all **non 'customfield'** issue data is returned, for finding custom field information,
    first find the name of the field in the JIRA API and add it to the list
    e.g. `summary,description,customfield_10000`
* `maxResults` - A number of maximum results to return from the search. If not sent, defaults to 50.
    
### Outputs 

* `issueData` - JSON data containing all issue data

#### Example 📄

```json
{
  "jql": "<The query you originally passed in>",
  "quantity": 2,
  "issues": [
    {
      "key": "ABC-1",
      "fields": {
        "creator": {
          Stuff...
        }
      },
      ...
    }
  ]
}
```
