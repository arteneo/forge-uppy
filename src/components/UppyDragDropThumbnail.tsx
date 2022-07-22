import React from "react";
import { Box, FormControl, FormLabel } from "@mui/material";
import UppyDragDrop, { UppyDragDropProps } from "./UppyDragDrop";
import UppyThumbnail from "./UppyThumbnail";

interface UppyDragDropThumbnailProps extends UppyDragDropProps {
    height?: number;
    path: string;
    label?: React.ReactNode;
    hasError: boolean;
    required: boolean;
    disabled: boolean;
}

const UppyDragDropThumbnail = ({
    height = 180,
    path,
    label,
    hasError,
    required,
    disabled,
    uppy,
    ...props
}: UppyDragDropThumbnailProps) => {
    return (
        <FormControl {...{ error: hasError, required, disabled }}>
            <FormLabel {...{ sx: { mb: 1 } }}>{label}</FormLabel>
            <Box
                {...{
                    sx: {
                        display: "grid",
                        gridTemplateColumns: "1fr 180px",
                        minHeight: 180,
                        gap: 2,
                    },
                }}
            >
                <UppyDragDrop {...{ uppy, disabled, ...props }} />
                <UppyThumbnail {...{ height, path, uppy }} />
            </Box>
        </FormControl>
    );
};

export default UppyDragDropThumbnail;
export { UppyDragDropThumbnailProps };
