# JIRA JQL Search GitHub Action

This action searches JIRA for the issues that match the JQL passed in, and returns the results in a JSON array.

_**This action requires the [JIRA Login](https://github.com/marketplace/actions/jira-login) action.**_

## Action Information

### Environment Variables
None

### Inputs

* `jql` _(required)_ - A JIRA JQL query
* `fields` - A comma-separated list of fields to map out of the issue data
  * When no supplied, all **non-custom field** issue data is returned, for finding custom field information,
    first find the name of the field in the JIRA API and add it to the list
    e.g. `summary,description,customfield_10000`
    
### Outputs

* `issueData` - JSON data containing all issue data

#### Example

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