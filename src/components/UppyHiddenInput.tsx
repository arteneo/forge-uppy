import React from "react";
import { Box } from "@mui/material";
import UppyType from "../definitions/UppyType";

interface UppyHiddenInputProps {
    inputRef: React.Ref<HTMLInputElement>;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    uppy: UppyType;
    required: boolean;
    disabled: boolean;
    fileName?: string;
}

const UppyHiddenInput = ({ inputRef, onInputChange, uppy, required, disabled, fileName }: UppyHiddenInputProps) => {
    const { restrictions } = uppy.opts;
    const accept = restrictions.allowedFileTypes ? restrictions.allowedFileTypes.join(",") : null;

    return (
        <Box
            {...{
                ref: inputRef,
                component: "input",
                type: "file",
                required: typeof fileName !== "undefined" ? false : required,
                disabled,
                multiple: restrictions.maxNumberOfFiles !== 1,
                accept,
                onChange: onInputChange,
                // http://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/
                // Changed width/height from 0.1px to 0.5px (it did not work on Chrome v103 Ubuntu 22.04)
                sx: {
                    width: "0.5px",
                    height: "0.5px",
                    opacity: 0,
                    overflow: "hidden",
                    position: "absolute",
                    zIndex: -1,
                },
            }}
        />
    );
};

export default UppyHiddenInput;
export { UppyHiddenInputProps };
