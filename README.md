# generator-cep-vue-cli

[![NPM version][npm-image]][npm-url]

## Generate an Adobe CEP extension in a few simple steps:

![](https://thumbs.gfycat.com/GloriousAlarmingInchworm-size_restricted.gif)

---

## Contributors

Special thanks to Adam and Eric for their invaluable (and shockingly free) help

| <img src="https://avatars2.githubusercontent.com/u/37279677?s=460&v=4" alt="adam" width="100"/> | <img src="https://avatars1.githubusercontent.com/u/8580225?s=460&v=4" alt="adam" width="100"/> | <img src="https://avatars0.githubusercontent.com/u/9142587?s=460&v=4" alt="eric" width="100"/> |
| :---------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: |
|                        [Tom Scharstein](https://github.com/Inventsable)                         |                          [Adam Plouff](https://github.com/adamplouff)                          |                       [Eric Robinson](https://github.com/ericdrobinson)                        |
|                                             Creator                                             |                                        General Wizardry                                        |                                       Inspector General                                        |

---

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

- [Bare](https://github.com/Inventsable/cep-vue-cli-bare2x) (No extras)
- [Basic](https://github.com/Inventsable/cep-vue-cli-basic2x) (Barebones with utility components)
- [Router](https://github.com/Inventsable/cep-vue-cli-router2x) (Basic & Vue Router)
- [Plus](https://github.com/Inventsable/cep-vue-cli-plus2x) (Vuetify, Router & Lottie)

---

## Commands

Each template comes with 5 commands baked in ([see details here](https://github.com/Inventsable/CEP-Self-Signing-Panel#what-do-they-do)):

- `npm run help` - A full list of the commands available and descriptions.
- `npm run switch` - Reports whether in developer or production context and can switch automatically.
- `npm run update` - Reports current version of panel in manifest and prompts to update Major, Minor, or Micro.
- `npm run register` - Reports the current user data (if any) and prompts to save new info to be used in certificates.
- `npm run sign` - Automatically stages and signs the extension, placing it in a `./archive` directory within the current panel.

---

## Extras and Add-ons

- [starlette](https://github.com/Inventsable/starlette) _(Shipped in all templates)_ - Color and theming engine that handles all host app colors and exposes them as reactive CSS variables to save you the need to do any theme or color logic yourself.
- [leylo](https://github.com/Inventsable/leylo) - Library to integrate a Firebase backend into any panel with a single command and line of code, providing over 40 CRUD actions for Firestore database.
- ~~[FS Example](https://github.com/Inventsable/CEP-FS-Example) - Demonstration of how to include `require()` for both Dev and Production contexts (needed due to being mixed content within an iframe while in Developer context)~~ **No longer needed!** Panels now automatically work with `require()` with no additional steps regardless of context.

## License

MIT © [Tom Scharstein](www.inventsable.cc)

[npm-image]: https://badge.fury.io/js/generator-cep-vue-cli.svg
[npm-url]: https://npmjs.org/package/generator-cep-vue-cli
[travis-image]: https://travis-ci.org/Inventsable/generator-cep-vue-cli.svg?branch=master
[travis-url]: https://travis-ci.org/Inventsable/generator-cep-vue-cli
[daviddm-image]: https://david-dm.org/Inventsable/generator-cep-vue-cli.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Inventsable/generator-cep-vue-cli
