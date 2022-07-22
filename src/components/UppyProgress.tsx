import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { Cancel, PauseCircle, PlayCircle } from "@mui/icons-material";
import { IconButton } from "@arteneo/forge";
import UppyType from "../definitions/UppyType";

interface UppyProgressProps {
    uppy: UppyType;
}

const UppyProgress = ({ uppy }: UppyProgressProps) => {
    const [totalProgress, setTotalProgress] = React.useState<undefined | number>(undefined);
    const [paused, setPaused] = React.useState(false);

    React.useEffect(() => {
        uppy.on("file-added", () => setTotalProgress(0));
        uppy.on("file-removed", () => setTotalProgress(undefined));
        uppy.on("progress", (progress: number) => setTotalProgress(progress));

        return () => {
            uppy.off("file-added");
            uppy.off("file-removed");
            uppy.off("progress");
        };
    }, []);

    const pause = () => {
        uppy.pauseAll();
        setPaused(true);
    };

    const resume = () => {
        uppy.resumeAll();
        setPaused(false);
    };

    const cancel = () => {
        uppy.cancelAll();
        setPaused(false);
    };

    if (typeof totalProgress === "undefined" || totalProgress === 100) {
        return null;
    }

    return (
        <Box {...{ display: "grid", gridTemplateColumns: "1fr 40px 66px", gap: 1, alignItems: "center" }}>
            <LinearProgress {...{ variant: "determinate", value: totalProgress }} />
            <Box {...{ display: "flex", textAlign: "center" }}>
                <Typography>{totalProgress} %</Typography>
            </Box>
            <Box {...{ display: "flex" }}>
                {paused ? (
                    <IconButton
                        {...{
                            icon: <PlayCircle {...{ fontSize: "small" }} />,
                            size: "small",
                            color: "success",
                            tooltip: "uppy.progress.resume",
                            onClick: () => resume(),
                        }}
                    />
                ) : (
                    <IconButton
                        {...{
                            icon: <PauseCircle {...{ fontSize: "small" }} />,
                            size: "small",
                            color: "warning",
                            tooltip: "uppy.progress.pause",
                            onClick: () => pause(),
                        }}
                    />
                )}
                <IconButton
                    {...{
                        icon: <Cancel {...{ fontSize: "small" }} />,
                        size: "small",
                        color: "error",
                        tooltip: "uppy.progress.cancel",
                        onClick: () => cancel(),
                    }}
                />
            </Box>
        </Box>
    );
};

export default UppyProgress;
export { UppyProgressProps };
