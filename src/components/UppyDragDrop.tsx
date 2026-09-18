import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { type UppyFileType } from "../definitions/UppyFileType";
import { type UppyType } from "../definitions/UppyType";

interface UppyDragDropProps {
    inputRef: React.RefObject<HTMLInputElement>;
    addFiles: (files: UppyFileType[]) => void;
    disabled: boolean;
    uppy: UppyType;
}

let draggingOverTimeout: ReturnType<typeof setTimeout>;

const UppyDragDrop = ({ inputRef, addFiles, disabled, uppy: _uppy }: UppyDragDropProps) => {
    const { t } = useTranslation();
    const [draggingOver, setDraggingOver] = React.useState(false);

    const onClick = () => {
        if (!disabled && inputRef?.current) {
            inputRef.current.click();
        }
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (typeof draggingOverTimeout !== "undefined") {
            clearTimeout(draggingOverTimeout);
        }

        setDraggingOver(false);

        const files = Array.from(event.dataTransfer.files);
        addFiles(files);
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        setDraggingOver(true);

        if (typeof draggingOverTimeout !== "undefined") {
            clearTimeout(draggingOverTimeout);
        }
    };

    const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (typeof draggingOverTimeout !== "undefined") {
            clearTimeout(draggingOverTimeout);
        }

        // Timeout against flickering, this solution is taken from drag-drop library.
        // Solution with 'pointer-events: none' didn't work across browsers.
        draggingOverTimeout = setTimeout(() => {
            setDraggingOver(() => false);
        }, 50);
    };

    return (
        <Box
            {...{
                sx: {
                    borderWidth: 2,
                    borderStyle: "dashed",
                    borderColor: draggingOver ? "grey.400" : "grey.300",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                },
                onDragOver: disabled ? undefined : onDragOver,
                onDragLeave: disabled ? undefined : onDragLeave,
                onDrop: disabled ? undefined : onDrop,
                onClick,
            }}
        >
            <Typography
                {...{ variant: "caption", align: "center", sx: { color: disabled ? "text.disabled" : undefined } }}
            >
                {t("uppy.dragDrop")}
            </Typography>
        </Box>
    );
};

export { UppyDragDrop, type UppyDragDropProps };
