const dateFormat = require('dateformat')
const { promisify } = require('util')
const readFileAsync = promisify(require('fs').readFile)
const path = require('path')

const templateDir = `${process.cwd()}/node_modules/semantic-release-gitmoji/lib/assets/templates`
const template = readFileAsync(path.join(templateDir, 'default-template.hbs'))
const commitTemplate = readFileAsync(path.join(templateDir, 'commit-template.hbs'))

module.exports = {
  repositoryUrl: 'git@github.com:DanielHilton/jira-jql-search.git',
  branches: ['master'],
  plugins: [
    ['semantic-release-gitmoji', {
      releaseRules: {
        major: [':boom:'],
        minor: [':sparkles:', ':fire:', ':building_construction:', ':coffin:'],
        patch: [
          ':bug:', ':ambulance:', ':lock:',
          ':art:', ':lipstick:', ':rotating_light:',
          ':arrow_up:', ':arrow_down:', ':recycle:',
          ':pencil2:', ':truck:', ':goal_net:',
          ':adhesive_bandage:', ':dizzy:'
        ]
      },
      releaseNotes: {
        template,
        partials: { commitTemplate },
        helpers: {
          datetime: function (format = 'UTC:yyyy-mm-dd') {
            return dateFormat(new Date(), format)
          }
        },
        issueResolution: {
          template: '{baseUrl}/{owner}/{repo}/issues/{ref}',
          baseUrl: 'https://github.com',
          source: 'github.com'
        }
      }
    }],
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md'
    }],
    ['@semantic-release/npm', {
      npmPublish: false
    }],
    ['@semantic-release/git', {
      assets: ['package.json', 'CHANGELOG.md', 'package-lock.json'],
      message: ':bookmark: ${nextRelease.version}'
    }],
    '@semantic-release/github'
  ]
}
