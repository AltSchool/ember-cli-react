/* eslint-env node */
module.exports = {
  scenarios: [
    {
      name: 'ember-1.13',
      bower: {
        dependencies: {
          ember: '~1.13.0',
        },
      },
    },
    {
      name: 'ember-lts-2.4',
      bower: {
        dependencies: {
          ember: '~2.4.0',
        },
      },
    },
    {
      name: 'ember-lts-2.8',
      bower: {
        dependencies: {
          ember: 'components/ember#lts-2-8',
        },
        resolutions: {
          ember: 'lts-2-8',
        },
      },
      npm: {
        devDependencies: {
          'ember-source': null,
        },
      },
    },
    // Glimmer was introduced in v2.10, so better test it
    {
      name: 'ember-2.10',
      bower: {
        dependencies: {
          ember: '~2.10.0',
        },
      },
    },
    {
      name: 'ember-lts-2.12',
      npm: {
        devDependencies: {
          'ember-source': '~2.12.0',
        },
      },
    },
    {
      name: 'ember-lts-2.16',
      npm: {
        devDependencies: {
          'ember-source': '~2.16.0',
        },
      },
    },
    {
      name: 'ember-lts-2.18',
      npm: {
        devDependencies: {
          'ember-source': '~2.18.0',
        },
      },
    },
    {
      name: 'ember-3.0',
      npm: {
        devDependencies: {
          'ember-source': '~3.0.0',
        },
      },
    },
    {
      name: 'ember-3.1',
      npm: {
        devDependencies: {
          'ember-source': '~3.1.0',
        },
      },
    },
    {
      name: 'ember-3.2',
      npm: {
        devDependencies: {
          'ember-source': '~3.2.0',
        },
      },
    },
    {
      name: 'ember-3.4',
      npm: {
        devDependencies: {
          'ember-source': '~3.4.0',
        },
      },
    },
    {
      name: 'ember-3.6',
      npm: {
        devDependencies: {
          'ember-source': '~3.6.0',
        },
      },
    },
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          ember: 'components/ember#release',
        },
        resolutions: {
          ember: 'release',
        },
      },
      npm: {
        devDependencies: {
          'ember-source': null,
        },
      },
    },
    {
      name: 'ember-beta',
      bower: {
        dependencies: {
          ember: 'components/ember#beta',
        },
        resolutions: {
          ember: 'beta',
        },
      },
      npm: {
        devDependencies: {
          'ember-source': null,
        },
      },
    },
    {
      name: 'ember-canary',
      bower: {
        dependencies: {
          ember: 'components/ember#canary',
        },
        resolutions: {
          ember: 'canary',
        },
      },
      npm: {
        devDependencies: {
          'ember-source': null,
        },
      },
    },
    {
      name: 'ember-default',
      npm: {
        devDependencies: {},
      },
    },
  ],
};
