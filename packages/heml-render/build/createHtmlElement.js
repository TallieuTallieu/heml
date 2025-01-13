import stringifyAttributes from './stringifyAttributes';
import { voidHtmlTags } from 'html-tags';
export default function createHtmlElement({
  name,
  attrs,
  contents = ' '
}) {
  if (voidHtmlTags.includes(name)) {
    return `<${name}${attrs ? stringifyAttributes(attrs) : ''} />`;
  }
  return `<${name}${attrs ? stringifyAttributes(attrs) : ''}>${contents || ' '}</${name}>`;
}