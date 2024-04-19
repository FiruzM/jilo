<h2  align="center"> Nuxt 3 App

</h2><br>

## Features

- 💚 [Nuxt 3](https://nuxt.com/) - SSR, ESR, File-based routing, components auto importing, modules, etc.

- ⚡️ Vite - Instant HMR.

- 🔥 The `<script setup>` syntax.

- ✨ [TailwindCSS](https://tailwindcss.com/) for styling

- 🧰 [Shadcn Vue](https://www.shadcn-vue.com/) for components with [Radix vue](https://www.radix-vue.com/)

- 🍍 [State Management via Pinia](https://github.com/vuejs/pinia), see [./composables/user.ts](./composables/user.ts).

- 📑 [Layout system](./layouts).

- 📥 APIs auto importing - for Composition API, VueUse and custom composables.

- 🏎 Zero-config cloud functions and deploy.

- 🦾 TypeScript, of course.

## Plugins

### Nuxt Modules

-  [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition APIs.

-  [Pinia](https://github.com/vuejs/pinia) - intuitive, type safe, light and flexible Store for Vue.

-  [DevTools](https://github.com/nuxt/devtools) - unleash Nuxt Developer Experience.

## IDE

We recommend using [VS Code](https://code.visualstudio.com/) with [Volar](https://github.com/johnsoncodehk/volar) to get the best experience (You might want to disable [Vetur](https://vuejs.github.io/vetur/) if you have it).

## Install dependencies
`pnpm install`

## Run the dev mode
`pnpm dev`

## Build the project
`pnpm build`

## Deployment
1. Run the `pnpm build`
2. Run the `node .output/server/index.mjs`
