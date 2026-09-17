# Branches

You can use following branches:

1. `main` (default) - Deprecated
2. `v5` - branch for version `5.x` (React 18 and Uppy 5 with Vite which ships ESM build)
2. `v4` - branch for version `4.x` (React 18 and Uppy 3 with Vite which ships ESM build)
3. `v3` - branch for version `3.x` (React 18 and Uppy 3 with webpack which ships UMD build)
4. `v2` - branch for version `2.x` (React 17 and Uppy 3 with webpack which ships UMD build)

# Prerequisite

Install dependencies using `npm install`.

# Development

Run `npm run dev` to run typechecking using typescript and linting using oxlint (executes once, there is no watch capabilities, use VSC extension `Oxc` instead).

Run `npm run format:check` to run formatter.

In case you would like to run them separately use:

- `npm run tsc:check` for typechecking using typescript
- `npm run lint:check` linting using oxlint

You can also run `npm run lint:fix` to fix most of the issues reported by `oxlint`.
You can also run `npm run format:fix` to fix most of the issues reported by `oxfmt`.
You can also run `npm run tsc:watch` to watch for issues reported by `tsc`.

Notice! `npm run lint:check` still reports a few errors, they should be fixed as soon as time allows.

# Workflow

1. Create issue on github
2. Create branch `i-X` where `X` is issue number
3. Change source code according to needs of created issue
4. Run `npm run dev`
5. Run `npm run test`
6. Commit with prefix `#X` where `X` is issue number and push changes
7. Create merge request from `i-X` to selected version branch
8. Code review merge request

# Publishing new version

1. Introduce changes according to `Workflow`
2. After approval merge changes in merge requests that should be introduced in upcoming version
3. Checkout to selected version branch and pull newest changes
4. Update `version` in `package.json`
5. Build package using `npm run build`
6. Commit with message `Production release vMAJOR.MINOR.PATCH` and push changes
7. Publish package using `npm publish`
8. Create release on github

# Including development build in your project

You can use `npm pack` to easily include development build into your project. This may be helpful to developing or testing new components and updating or introducing new dependencies within the library.

1. Run `npm run build`
2. Run `npm pack`
3. File should be created i.e. `arteneo-forge-uppy-4.0.1.tgz`
4. In your project run `npm install arteneo-forge-uppy-4.0.1.tgz --no-audit --verbose`. This will include current build into your project. Option `--no-audit` is helpful in making the process quicker. Option `--verbose` simply provides more information

# Restrictions

Uppy documentation: https://uppy.io/docs/uppy/#restrictions

## Max file size

Maximum file size in bytes for each individual file.

```js
const options = {
    restrictions: {
        // 500 kb
        maxFileSize: 500 * 1024,
    },
};
```

## Allowed file types

Array of wildcards `image/*`, exact mime types `image/jpeg`, or file extensions `.jpg`.

```js
const options = {
    restrictions: {
        allowedFileTypes: ["image/*", ".jpg", ".jpeg", ".png", ".gif"],
    },
};
```

Note! Allowed file types will also be used in hidden file input (in `accept` HTML attribute). This means selecting a file from your PC will also be restricted (i.e. Chrome is actually hiding not accepted files).

# Access and refresh tokens (JWT)

We can pass additional options in `uppyTusOptions` to add access token to headers and use refresh token when needed.

Example implementation in `utilities/uppy.tsx` as follows.

```
import { TusOptions } from "@uppy/tus";
import { DetailedError } from "tus-js-client";
import { getAccessToken, refreshAccessToken, updateLastAlive } from "~app/utilities/authenticationTokens";

export const uppyTusOptions: TusOptions = {
    async onBeforeRequest(req) {
        const accessToken = await getAccessToken();
        req.setHeader("Authorization", "Bearer " + accessToken);
    },
    onShouldRetry(err, retryAttempt, options, next) {
        if ((err as DetailedError)?.originalResponse?.getStatus() === 401) {
            return true;
        }

        return next(err);
    },
    async onAfterResponse(req, res) {
        if (res.getStatus() === 401) {
            await refreshAccessToken();
            updateLastAlive();
        }
    },
};
```

Explanation for internal functions:

1. `getAccessToken` - Returns access token (as a string)
2. `refreshAccessToken` - Refreshes access token using refresh token
3. `updateLastAlive` - Application specific, can be used to keep alive session

Example usage:

```
import React from "react";
import { getFields } from "@arteneo/forge";
import { UploadSingleDragDropImage } from "@arteneo/forge-uppy";
import { uppyTusOptions } from "~app/utilities/uppy";

type FieldName = "image";

const fields = {
    image: <UploadSingleDragDropImage {...{ uppyTusOptions }} />,
};

export default (names?: FieldName[]) => getFields<FieldName>(names, fields);
export { FieldName };
```

# Translations

Did not find a good solution to handle translations within Uppy. In our case it applies only to errors emitted by Restrictor (restriction of number of files, file sizes or file types). It seems that we need to prepare translation files specifically for Uppy if we want different translations. Uppy uses internal Translator with has different variable syntax and probably different pluralization.

More on translations:

https://uppy.io/docs/locales/

# Development

1. Install dependencies using `npm install`.
2. Build package using `npm run build`.
3. Update `version` in `package.json`.
4. Commit and push changes.
5. Publish package using `npm publish`.
