import { IconButton } from "@arteneo/forge";
import { Cancel, PauseCircle, PlayCircle } from "@mui/icons-material";
import { Box, LinearProgress, Typography } from "@mui/material";

import { type UppyType } from "../definitions/UppyType";
import { useUppyState } from "@uppy/react";

interface UppyProgressProps {
    uppy: UppyType;
}

const UppyProgress = ({ uppy }: UppyProgressProps) => {
    const totalProgress = useUppyState(uppy, (state) => state.totalProgress);
    const currentUploads = useUppyState(uppy, (state) => state.currentUploads);
    const files = useUppyState(uppy, (state) => state.files);

    const isUploading = Object.keys(currentUploads).length > 0;
    const isPaused = Object.values(files).some((file) => file.isPaused);

    if (!isUploading) {
        return null;
    }

    return (
        <Box {...{ display: "grid", gridTemplateColumns: "1fr 40px 66px", gap: 1, alignItems: "center" }}>
            <LinearProgress {...{ variant: "determinate", value: totalProgress }} />
            <Box {...{ display: "flex", textAlign: "center" }}>
                <Typography {...{ whiteSpace: "nowrap" }}>{totalProgress} %</Typography>
            </Box>
            <Box {...{ display: "flex" }}>
                {isPaused ? (
                    <IconButton
                        {...{
                            icon: <PlayCircle {...{ fontSize: "small" }} />,
                            size: "small",
                            color: "success",
                            tooltip: "uppy.progress.resume",
                            onClick: () => uppy.resumeAll(),
                        }}
                    />
                ) : (
                    <IconButton
                        {...{
                            icon: <PauseCircle {...{ fontSize: "small" }} />,
                            size: "small",
                            color: "warning",
                            tooltip: "uppy.progress.pause",
                            onClick: () => uppy.pauseAll(),
                        }}
                    />
                )}
                <IconButton
                    {...{
                        icon: <Cancel {...{ fontSize: "small" }} />,
                        size: "small",
                        color: "error",
                        tooltip: "uppy.progress.cancel",
                        onClick: () => uppy.cancelAll(),
                    }}
                />
            </Box>
        </Box>
    );
};

export { UppyProgress, type UppyProgressProps };
