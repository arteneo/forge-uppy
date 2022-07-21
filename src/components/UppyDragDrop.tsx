import React from "react";
import { useTranslation } from "react-i18next";
import getDroppedFiles from "@uppy/utils/lib/getDroppedFiles";
import { Box, Typography } from "@mui/material";
import UppyFileType from "../definitions/UppyFileType";
import UppyType from "../definitions/UppyType";

interface UppyDragDropProps {
    inputRef: null | HTMLInputElement;
    addFiles: (files: UppyFileType[]) => void;
    disabled: boolean;
    uppy: UppyType;
}

let draggingOverTimeout: ReturnType<typeof setTimeout>;

const UppyDragDrop = ({ inputRef, addFiles, disabled, uppy }: UppyDragDropProps) => {
    const { t } = useTranslation();
    const [draggingOver, setDraggingOver] = React.useState(false);

    const onClick = () => {
        if (inputRef && !disabled) {
            inputRef.click();
        }
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (typeof draggingOverTimeout !== "undefined") {
            clearTimeout(draggingOverTimeout);
        }

        setDraggingOver(false);

        const logDropError = (error: string) => {
            uppy.log(error, "error");
        };
        getDroppedFiles(event.dataTransfer, { logDropError }).then((files) => addFiles(files));
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

export default UppyDragDrop;
export { UppyDragDropProps };
