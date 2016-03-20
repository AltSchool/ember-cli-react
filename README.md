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
