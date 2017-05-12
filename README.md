# Codemod Scripts

This repo contains some random [jscodeshift](https://github.com/facebook/jscodeshift) code mods we have run against the CivicSource codebase. Keeping them for posterity.

## How to Use

Just copy whatever codemod script you want to the root of wherever you want to run it. Then just run:

```
jscodeshift path/to/files/to/transform -t ./my-transform-file.js
```

### `kill-app.js`

We used to have `app` aliased to a specific subfolder in the project. This caused problems when validating our code with [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import). This codemod replaces all instances of `app/whatever` with the correct relative path, e.g. `./../../whatever` depending on the file's location on the filesystem.
