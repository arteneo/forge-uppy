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
