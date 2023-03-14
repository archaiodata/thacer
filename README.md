# thacer

## Backend

All related backend file are in the API directory.  
All the backend data are readonly, so during frontend development, you just use
the production's backend/

## Frontend setup

Project was created with the recommended method  `npm init vue@latest`, and not
with the vue cli.  
It was created in a subdirectory "vue-thacer"

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

#### Prettier and Eslint

- Please, configure your IDE to auto format files on save with **prettier**.
- Please, configure your IDE to warn you of code quality issues with **eslint**.

See below the details, and don't hesitate to ask for help.

#### Vscode

- The vue team
  recommends [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  and recommends to disable or uninstall Vetur.
- Install the 3 "volar", "prettier - code formatter", and "eslint" plugins.

- Prettier:
    - In pref "Editor: Format on Save." : Enable
    - (you can also do the same for "Format on type")
    - In pref "Editor: Default Formatter" : choose prettier
    - --> try to un-format a file and save : it should auto format as defined in
      prettierrc

- Eslint
    - --> declare a variable and don't use it : you should be warned with a '
      no-unused-vars'
    - For the moment, it seems that the eslint message are doubled with ts
      message. I
      didn't manage to fix this

I am not expert in vscode and don't use it. This seems to work. As always, don't
hesitate to suggest
improvements.

#### JetBrain's Intellij (phpstorm, webstrom, ...)

in preferences :

- eslint: choose "automatic configuration".
- prettier: specify the package path, add "vue,css,scss,html,json,cjs" in "run
  for files", check "reformat on save". (should be `{**/*,*}.{js,ts,jsx,tsx,vue,css,scss,html,json,cjs}`)
- Disable "reformat code" in "actions on save", to disable intellij own reformatting tool

## Best practices frontend

1. Fix all console warnings or errors before committing.

1. Fix all eslint warnings or errors before committing.

1. Fix all IDE warnings or errors before committing.

1. Always develop with the devtools open.

1. Follow the 2 (at this date) vue best practice :
    - https://vuejs.org/guide/introduction.html (menu "best practice" on the
      left)
    - https://vuejs.org/style-guide/

## CSS

### Boostrap icons

I chose to use them as svg, not as font, to win some bundle size. If needed to
switch in the future, see https://stackoverflow.com/a/63653277/1657853

## Git

1. Flow : we create branch and PR in GitHub. We squash commit. Ask someone.

1. Use the standard commit naming "_like a title and imperative_" **for single
   commit,
   squashed commit, and PR names**.

```
Short and descriptive
Capitalized
Not end with period

In imperative present tense
```

Example for single commit : `Implement access right management`

2. For PR and squash commit names (1), better long than incomplete. But :
   details
   and precision can be put in the description part (2), below the title. This
   description part will be kept in the PR description and in the git history,
   so for more mundane
   communication, use PR comments (3)

Example for Squashed commit and PR name :

```
#14 Implement access right management and rewrite the API accordingly

Description :
Access right manamgement implmentation had to be done like blabla, in this place, because blablabla. 
It needed a rewrite of some routes of the API because blablabla. These routes are blablabla.
see https://ww.blablabla.co/blabla
```

Example for comment :

```
Hey Gerard, could you double check the re-writing of the url for the user infos route ? I may have miss some cases.
```

4. **Important !** Always add the `#<issue id>` in the PR name and in the final
   squash commit !!! (the issue id, not the PR id),

Example : `#14 Implement access right management and rewrite the API accordingly`
