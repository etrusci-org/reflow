# Reflow Development

## Install jQuery Types For TypeScript

Just so tsc doesn't freak out.

```bash
cd reflow/
npm i --save-dev @types/jquery
```

This will download:
```text
node_modules/
package-lock.json
package.json
```

The jQuery 3.x.x file itself must be [downloaded manuallly](https://jquery.com/download/) and put in **app/vendor/**.

---

## Run Workers

1. tsc-watch.sh - Watch for Typescript source changes
2. sass-watch.sh - Watch for SASS source changes
3. csso-watch.sh - Watch for CSS source changes
4. color-bake.sh - Manually run whenever you update **src/scss/color-*.scss**

Visual Studio Code users can run the build task **reflow build** from **.vscode/tasks.json**.

---
