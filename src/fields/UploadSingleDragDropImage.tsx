import { Box } from "@mui/material";
import { BaseUpload, type BaseUploadProps } from "../fields/BaseUpload";
import { UppyProgress } from "../components/UppyProgress";
import { UppyHiddenInput } from "../components/UppyHiddenInput";
import { UppyError } from "../components/UppyError";
import { UppyOfflineAlert } from "../components/UppyOfflineAlert";
import { UppyDragDropThumbnail } from "../components/UppyDragDropThumbnail";

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

export { UploadSingleDragDropImage, type UploadSingleDragDropImageProps };
