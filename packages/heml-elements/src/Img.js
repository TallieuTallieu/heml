import utils from '@tallieu_tallieu/heml-utils' // eslint-disable-line no-unused-vars
import Style from './Style.js'
import lodash from 'lodash'
const { omit, has } = lodash;
import fs from 'fs-extra'
import isAbsoluteUrl from 'is-absolute-url'
import axios from 'axios'
import sizeOf from 'image-size'
const { createElement, transforms } = utils;
export default createElement('img', {
  attrs: [ 'src', 'width', 'height', 'alt', 'infer', 'inline', 'style' ],
  children: false,
  defaultAttrs: {
    border: '0',
    alt: ''
  },

  rules: {
    'img': [ { '@pseudo': 'root' }, { display: transforms.trueHide() }, '@default' ]
  },

  async render (attrs, contents) {
    const isBlock = !attrs.inline

    if (!!attrs.infer && has(attrs, 'src') && !attrs.width) {
      attrs.width = await getWidth(attrs.src, attrs.infer === 'retina')
    }

    attrs.class += ` ${isBlock ? 'img__block' : 'img__inline'}`
    attrs.style = isBlock ? '' : 'display: inline-block;'

    return ([
      <img {...omit(attrs, 'inline', 'infer')} />,
      <Style for='img'>{`
        .img__block {
          display: block;
          max-width: 100%;
        }
      `}</Style>])
  }
})

async function getWidth (path, isRetina) {
  try {
    const image = await (isAbsoluteUrl(path) ? getRemoteBuffer(path) : fs.readFile(path))

    const { width } = sizeOf(image)
    if (!width) { return 'auto' }

    return isRetina ? Math.round(width / 2) : width
  } catch (e) {
    return 'auto' // if we fail fall back to auto
  }
}

function getRemoteBuffer (path) {
  return axios({
    method: 'get',
    url: path,
    responseType: 'arraybuffer'
  })
  .then(({ data }) => {
    return Buffer.from(data, 'binary')
  })
}
