import React from "react";
import { Box } from "@mui/material";
import BaseUpload, { BaseUploadProps } from "../fields/BaseUpload";
import UppyProgress from "../components/UppyProgress";
import UppyPrettyInput from "../components/UppyPrettyInput";
import UppyHiddenInput from "../components/UppyHiddenInput";
import UppyError from "../components/UppyError";
import UppyOfflineAlert from "../components/UppyOfflineAlert";

type UploadSingleInputFileProps = Omit<BaseUploadProps, "children">;

const UploadSingleInputFile = ({ ...baseUploadProps }: UploadSingleInputFileProps) => {
    return (
        <BaseUpload {...baseUploadProps}>
            {({
                inputRef,
                onInputChange,
                fileName,
                uppy,
                path,
                label,
                hasError,
                error,
                help,
                required,
                disabled,
                clear,
            }) => (
                <Box {...{ sx: { display: "flex", flexDirection: "column", gap: 1, position: "relative" } }}>
                    <UppyHiddenInput {...{ inputRef, onInputChange, uppy, required, disabled, fileName }} />
                    <UppyPrettyInput
                        {...{
                            inputRef,
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
            )}
        </BaseUpload>
    );
};

export default UploadSingleInputFile;
export { UploadSingleInputFileProps };
