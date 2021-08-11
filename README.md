<p align="center">
  <a href="https://campaign-test.nicolasmura.com" target="_blank">
    <img alt="Campaign test image" src="./apps/frontend-public/src/assets/icons/favicon.ico" width="400" />
  </a>
</p>

# Campaign Test

Fullstack monorepo for Campaign test project. With Angular frontend for now, but could add a NestJS backend REST API.

- [Campaign Test](#campaign-test)
- [Requirements](#requirements)
- [Demo](#demo)
- [Quick start](#quick-start)
- [Methodology](#methodology)

# Requirements

To contribute to this project and run it locally, you will need:

* [Node JS >= v12.19.0 & NPM >= 6.14.8](https://nodejs.org/en)
* [Angular 11.x](https://angular.io)
* [Typescript >= 4.0.5](https://www.typescriptlang.org)
* [Docker >= 20.10.5](https://www.docker.com/)

> :bulb: **_Tip_**
>
> [Microsoft VS Code editor](https://code.visualstudio.com/) is already packaged with Typescript.

# Demo

You can see a working online demo of this project [here](https://campaign-test.nicolasmura.com).

# Quick start

To build and run the project locally:

```bash
  # clone
  git clone https://github.com/NicolasMura/campaign-test
  cd campaign-test

  # install dependencies
  yarn install

  # run with Nx
  npx nx serve frontend-public
```

Visit [https://localhost:4200](https://localhost:4200) in your browser.

> :information_source: **_Note_**
>
> Data can served from a server running at `http://localhost:3000` (see [`apps/frontend-public/src/env.js`](./apps/frontend-public/src/env.js) file)

# Methodology

This project was generated using [Nx](https://nx.dev) and below command:

```bash
  npx create-nx-workspace --preset=angular
```

`frontend-tools` and `vendors` Angular libraries were generated running the 'lib' Angular generator with Nx project support:

```bash
  npx nx g @nrwl/angular:lib frontend-tools
  npx nx g @nrwl/angular:lib vendors
```

`models` global shared library was generated running the Nx workspace 'lib' generator:

```bash
  npx nx g @nrwl/workspace:lib models
```

`campaign` routed module was generated inside `frontend-public` Angular project running the 'module' Angular generator with Nx project support:

```bash
  nx g @nrwl/angular:module modules/campaign --project frontend-public --routing true
```

`campaign-list` and `campaign-update` components were generated inside `frontend-public` Angular project running the 'component' Angular generator with Nx project support:

```bash
  nx g @nrwl/angular:component modules/campaign/campaign-list --project frontend-public
  nx g @nrwl/angular:component modules/campaign/campaign-update --project frontend-public
```

Similarly, `campaign-components` module and `campaign-form` component were generated inside `frontend-public` Angular project running:

```bash
  nx g @nrwl/angular:module modules/campaign/components/campaign-components --project frontend-public --flat true
  nx g @nrwl/angular:component modules/campaign/components/campaign-form --project frontend-public
```


`campaign` service was generated inside `frontend-public` Angular library running the 'service' Angular generator with Nx project support:

```bash
  nx g @nrwl/angular:service services/campaign --project frontend-tools --flat
```
