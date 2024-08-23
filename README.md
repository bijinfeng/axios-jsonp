# @pingtou/axios-jsonp

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A jsonp adapter for axios

support promise，support cancel，same as xhr

## Install

```bash
npm i @pingtou/axios-jsonp
```

## Usage

```javascript
import axios from 'axios'
import { jsonpAdapter } from '@pingtou/axios-jsonp'

axios({
  url: '/jsonp',
  adapter: jsonpAdapter,
  callbackParamName: 'c' // optional, 'callback' by default
}).then((res) => {

})
```

## License

[MIT](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@pingtou/axios-jsonp?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@pingtou/axios-jsonp
[npm-downloads-src]: https://img.shields.io/npm/dm/@pingtou/axios-jsonp?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@pingtou/axios-jsonp
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@pingtou/axios-jsonp?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@pingtou/axios-jsonp
[license-src]: https://img.shields.io/github/license/bijinfeng/axios-jsonp.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/bijinfeng/axios-jsonp/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@pingtou/axios-jsonp
