import * as path from "path";
import * as webpack from "webpack";
const ESLintPlugin = require("eslint-webpack-plugin");

const peerDependencies = {
    "@arteneo/forge": "^2.0.0",
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@mui/icons-material": "^5.6.2",
    "@mui/material": "^5.6.2",
    "@mui/system": "^5.6.2",
    "@uppy/core": "^2.3.1",
    "@uppy/react": "^2.2.2",
    "@uppy/tus": "^2.4.1",
    formik: "^2.2.9",
    i18next: "^21.6.7",
    react: "^17.0.2",
    "react-dom": "^17.0.2",
    "react-i18next": "^11.15.3",
    yup: "^0.32.11",
};

const externals = Object.fromEntries(
    Object.keys(peerDependencies).map((peerDependency) => [peerDependency, peerDependency])
);

const config: webpack.Configuration = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new ESLintPlugin({
            extensions: [".tsx", ".ts", ".js"],
        }),
    ],
    externals,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: {
            type: "umd",
        },
    },
};

export default config;
