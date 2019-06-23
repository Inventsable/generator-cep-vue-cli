# generator-cep-vue-cli

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

## Generate an Adobe CEP extension in a few simple steps:

![](https://thumbs.gfycat.com/GloriousAlarmingInchworm-size_restricted.gif)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-cep-vue-cli using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-cep-vue-cli
```

Then generate your new project:

```bash
# Recommended inside ../AppData/Roaming/CEP/extensions
yo cep-vue-cli

# Prompt for name
# Prompt for template
# Prompt for Adobe apps to be included in manifest and typescript
# Prompt for base localhost port
```

## Templates

See more information about usage:

- [Bare](https://github.com/Inventsable/cep-vue-cli-bare) (No extras)
- [Basic](https://github.com/Inventsable/cep-vue-cli-basic) (Barebones with utility components)
- [Router](https://github.com/Inventsable/cep-vue-cli-router) (Basic & Vue Router)
- [Plus](https://github.com/Inventsable/cep-vue-cli-plus) (Vuetify, Router & Lottie)

---

## Commands

Each template comes with 5 commands baked in ([see details here](https://github.com/Inventsable/CEP-Self-Signing-Panel#what-do-they-do)):

- `npm run help` - A full list of the commands available and descriptions.
- `npm run switch` - Reports whether in developer or production context and can switch automatically.
- `npm run update` - Reports current version of panel in manifest and prompts to update Major, Minor, or Micro.
- `npm run register` - Reports the current user data (if any) and prompts to save new info to be used in certificates.
- `npm run sign` - Automatically stages and signs the extension, placing it in a `./archive` directory within the current panel.

---

## Getting To Know Yeoman

- Yeoman has a heart of gold.
- Yeoman is a person with feelings and opinions, but is very easy to work with.
- Yeoman can be too opinionated at times but is easily convinced not to be.
- Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Tom Scharstein](www.inventsable.cc)

[npm-image]: https://badge.fury.io/js/generator-cep-vue-cli.svg
[npm-url]: https://npmjs.org/package/generator-cep-vue-cli
[travis-image]: https://travis-ci.org/Inventsable/generator-cep-vue-cli.svg?branch=master
[travis-url]: https://travis-ci.org/Inventsable/generator-cep-vue-cli
[daviddm-image]: https://david-dm.org/Inventsable/generator-cep-vue-cli.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Inventsable/generator-cep-vue-cli
