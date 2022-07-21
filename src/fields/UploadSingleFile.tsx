import React from "react";
import * as Yup from "yup";
import Uppy, { UploadResult } from "@uppy/core";
import Tus from "@uppy/tus";
import toArray from "@uppy/utils/lib/toArray";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { Box, LinearProgress, TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { useUppy } from "@uppy/react";
import { FieldPlaceholderInterface, Text, TextProps, useForm } from "@arteneo/forge";
import UppyProgress from "../components/UppyProgress";
import UppyPrettyInput from "../components/UppyPrettyInput";
import UppyDragDrop from "../components/UppyDragDrop";
import UppyDragDropThumbnail from "../components/UppyDragDropThumbnail";
import UppyHiddenInput from "../components/UppyHiddenInput";
import UppyError from "../components/UppyError";
import UppyOfflineAlert from "../components/UppyOfflineAlert";
import UppyFileType from "../definitions/UppyFileType";
import UppyType from "../definitions/UppyType";

type UploadSingleFileProps = TextProps;

const UploadSingleFile = ({
    // onChange,
    fieldProps,
    // eslint-disable-next-line
    // TODO
    // eslint-disable-next-line
    validate: fieldValidate = (value: any, required: boolean) => {
        if (required && !Yup.string().required().isValidSync(value)) {
            return "validation.required";
        }

        return undefined;
    },
    ...field
}: UploadSingleFileProps) => {
    return (
        <Box {...{ sx: { display: "flex", flexDirection: "column", gap: 2, position: "relative" } }}>
            <UppyHiddenInput {...{ inputRef, onInputChange, uppy, required, disabled, fileName }} />
            <UppyPrettyInput
                {...{
                    inputRef: inputRef?.current,
                    fileName,
                    path,
                    label,
                    hasError,
                    help,
                    required,
                    disabled,
                    clear,
                }}
            />
            <UppyProgress {...{ uppy }} />
            <UppyError {...{ uppy, error }} />
            <UppyOfflineAlert {...{ uppy, disabled }} />
        </Box>
    );
};

export default UploadSingleFile;
export { UploadSingleFileProps };
