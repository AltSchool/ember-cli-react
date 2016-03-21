# EmberReact

Use React component hierarchies inside your Ember app.

## Overview

Install the addon in your app:

```
ember install git+ssh://git@github.com:AltSchool/ember-react.git
```

Write your first JSX React component:

```javascript
// app/components/say-hi.jsx
import React from 'npm:react';

export default function(props) {
  return <span>Hello {props.name}</span>
}
```

Then render your component in a template:

```handlebars
{{react-component "say-hi" name="Alex"}}
```

## Next Steps

  * Must set `NODE_ENV=production` in order to properly minify react in production builds. Try to include this in an addon build hook.
  * Figure out how to test react components in ember-mocha
  * Build a more complete example of a table-view rendered with react. This example should include access to a service or analytics.

## Open Questions

  * How to get current-user in react-component
  * How to support analytics inside react components?
  * Is it ok to include react.js in our apps payload? What's the payload size change in production for vishnu-ui? And is there an Android perf difference for loading react.js without using it?
