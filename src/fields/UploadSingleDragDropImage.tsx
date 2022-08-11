import React from "react";
import { Box } from "@mui/material";
import BaseUpload, { BaseUploadProps } from "../fields/BaseUpload";
import UppyProgress from "../components/UppyProgress";
import UppyDragDropThumbnail from "../components/UppyDragDropThumbnail";
import UppyHiddenInput from "../components/UppyHiddenInput";
import UppyError from "../components/UppyError";
import UppyOfflineAlert from "../components/UppyOfflineAlert";

type UploadSingleDragDropImageProps = Omit<BaseUploadProps, "children">;

const UploadSingleDragDropImage = ({
    uppyOptions = {
        restrictions: {
            allowedFileTypes: ["image/*"],
        },
    },
    ...baseUploadProps
}: UploadSingleDragDropImageProps) => {
    return (
        <BaseUpload {...{ uppyOptions, ...baseUploadProps }}>
            {({
                inputRef,
                onInputChange,
                fileName,
                uppy,
                path,
                label,
                hasError,
                error,
                addFiles,
                help,
                required,
                disabled,
            }) => (
                <Box {...{ sx: { display: "flex", flexDirection: "column", gap: 1, position: "relative" } }}>
                    <UppyHiddenInput {...{ inputRef, onInputChange, uppy, required, disabled, fileName }} />
                    <UppyDragDropThumbnail
                        {...{ inputRef, addFiles, uppy, label, hasError, help, required, disabled, path }}
                    />
                    <UppyProgress {...{ uppy }} />
                    <UppyError {...{ uppy, error }} />
                    <UppyOfflineAlert {...{ uppy, disabled }} />
                </Box>
            )}
        </BaseUpload>
    );
};

export default UploadSingleDragDropImage;
export { UploadSingleDragDropImageProps };
