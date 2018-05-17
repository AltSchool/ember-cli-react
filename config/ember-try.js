/* eslint-env node */
module.exports = {
  scenarios: [
    {
      name: 'ember-1.13',
      bower: {
        dependencies: {
          ember: '~1.13.0'
        }
      }
    },
    {
      name: 'ember-2.10',
      bower: {
        dependencies: {
          ember: '~2.10.0'
        }
      }
    },
    {
      name: 'ember-lts-2.12',
      npm: {
        devDependencies: {
          'ember-source': '~2.12.0'
        }
      }
    },
    {
      name: 'ember-lts-2.16',
      npm: {
        devDependencies: {
          'ember-source': '~2.16.0'
        }
      }
    },
    {
      name: 'ember-lts-2.18',
      npm: {
        devDependencies: {
          'ember-source': '~2.18.0'
        }
      }
    },
    {
      name: 'ember-3.0.x',
      npm: {
        devDependencies: {
          'ember-source': '~3.0.0'
        }
      }
    },
    {
      name: 'ember-3.1.x',
      npm: {
        devDependencies: {
          'ember-source': '~3.1.0'
        }
      }
    }
  ]
};
