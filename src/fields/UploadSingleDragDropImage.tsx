import { Box } from "@mui/material";

import { UppyDragDropThumbnail } from "../components/UppyDragDropThumbnail";
import { UppyError } from "../components/UppyError";
import { UppyHiddenInput } from "../components/UppyHiddenInput";
import { UppyOfflineAlert } from "../components/UppyOfflineAlert";
import { UppyProgress } from "../components/UppyProgress";
import { BaseUpload, type BaseUploadProps } from "../fields/BaseUpload";

type UploadSingleDragDropImageProps = Omit<BaseUploadProps, "children">;

const UploadSingleDragDropImage = ({
    uppyOptions = {
        restrictions: {
            allowedFileTypes: ["image/*"],
        },
    } as UploadSingleDragDropImageProps["uppyOptions"],
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

export { UploadSingleDragDropImage, type UploadSingleDragDropImageProps };
