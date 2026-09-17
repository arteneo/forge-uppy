import { Box } from "@mui/material";

import { UppyError } from "../components/UppyError";
import { UppyHiddenInput } from "../components/UppyHiddenInput";
import { UppyOfflineAlert } from "../components/UppyOfflineAlert";
import { UppyPrettyInput } from "../components/UppyPrettyInput";
import { UppyProgress } from "../components/UppyProgress";
import { BaseUpload, type BaseUploadProps } from "../fields/BaseUpload";

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

export { UploadSingleInputFile, type UploadSingleInputFileProps };
