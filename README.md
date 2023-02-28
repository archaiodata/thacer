# thacer

## Frontend setup

```sh
cd vue-thacer
```

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Ide configuration

**Please** configure your IDE to auto format files on save with **prettier**   
**Please** configure your IDE to warn you of code quality issues with **
eslint**

Don't hesitate to ask for help

#### Vscode

+ [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
  disable Vetur)

- eslint configuration:
  see https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- prettier configuration: see "format on save"
  here https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

#### JetBrain's Intellij (phpstorm, webstrom, ...)

in preferences :

- eslint: choose "automatic configuration"
- prettier: specify the package path, add "vue" in "run for files", check "
  reformat on save"

## Best practices

### 1 - Fix all console warnings or errors before committing

### 2 - Fix all eslint warnings or errors before committing

### 3 - Fix all IDE warnings or errors before committing

### 4 - Always develop with the devtools open

### 5 - Use the standard commit naming "like a title, and imperative"

    Short and descriptive
    Capitalized
    Not end with period

    In imperative present tense

Example:

`Implement access right management`
