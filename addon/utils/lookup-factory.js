import { getOwner } from '@ember/application';

// See http://emberjs.com/deprecations/v2.x/#toc_injected-container-access
export default function lookupFactory(object, name) {
  if (getOwner) {
    return getOwner(object).resolveRegistration(name);
  } else {
    return object.get('container').lookupFactory(name);
  }
}
