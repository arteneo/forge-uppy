import * as path from "path";
import * as webpack from "webpack";
const ESLintPlugin = require("eslint-webpack-plugin");

// Remember to add this key:
// "@mui/x-date-pickers/internals/hooks/useUtils"
const peerDependencies = {
    "@date-io/date-fns": "^2.13.1",
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@mui/icons-material": "^5.6.2",
    "@mui/material": "^5.6.2",
    "@mui/system": "^5.6.2",
    "@mui/x-date-pickers": "^5.0.0-alpha.1",
    "@mui/x-date-pickers/internals/hooks/useUtils": "^5.0.0-alpha.1",
    axios: "^0.25.0",
    "date-fns": "^2.28.0",
    formik: "^2.2.9",
    i18next: "^21.6.7",
    "prop-types": "^15.8.1",
    react: "^17.0.2",
    "react-beautiful-dnd": "^13.1.0",
    "react-beforeunload": "^2.5.2",
    "react-dom": "^17.0.2",
    "react-highlight-words": "^0.17.0",
    "react-i18next": "^11.15.3",
    "react-router-dom": "^6.2.1",
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
