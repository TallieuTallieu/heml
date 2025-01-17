import utils from '@tallieu_tallieu/heml-utils'
import lodash from 'lodash'
const { isArray, intersection, difference } = lodash;
const { HEMLError } = utils;

export default function children ($node, { tagName, children: requiredChildren }) {
  if (isArray(requiredChildren)) {
    const children = $node.children().toArray().map((c) => c.name)

    const foundRequiredChildren = intersection(requiredChildren, children)

    if (foundRequiredChildren.length < requiredChildren.length) {
      const missingRequiredChildren = difference(requiredChildren, foundRequiredChildren)

      throw new HEMLError(`${tagName} is missing required children: ${missingRequiredChildren}`, $node)
    }
  }
};
