# Future plans

When uploading an image and could not refresh token anymore via RefreshToken we get `401` and uppy error, but it is not shown in `UppyError` component.

When using `UppySingleDragDropImage` and you cancel an upload, image should revert to previous one (or empty if it will be very hard to do). Probably the same case with `UppySingleInputFile`.

`help` flag is not tested with `UppySingleDragDropImage`.

Some kind of onChange prop for `BaseUpload` (which means `UppySingleDragDropImage` and `UppySingleFile` will also have it).

# Branches

You can use following branches:

1. `main` (default) - branch for current version `3.x`
2. `v2` - branch for version `2.x`

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
