# Reflow Development

## Install jQuery Types For TypeScript

Just so tsc doesn't freak out.

```bash
cd reflow/
npm i --save-dev @types/jquery
```

This will download the following files into the project root directory:
```text
node_modules/
package-lock.json
package.json
```

The jQuery 3.x.x file itself must be [downloaded manuallly](https://jquery.com/download/) and put in **app/lib/vendor/**.

---

## Build Tasks

These are preconfigured in **.vscode/tasks.json**.

- **tsc** - Compile TypeScript to JavaScript
- **sass** - Compile SASS to CSS
- **csso** - Optimize CSS

---

## Deploy

Just upload the **app/** directory.

---
