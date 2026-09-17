import { FormControl, FormHelperText } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { type UppyFileType } from "../definitions/UppyFileType";
import { type UppyType } from "../definitions/UppyType";

interface UppyErrorProps {
    uppy: UppyType;
    error?: string;
}

const UppyError = ({ uppy, error }: UppyErrorProps) => {
    const { t } = useTranslation();

    // Uppy errors are treated as general errors
    const [uppyError, setUppyError] = React.useState(false);
    const [uppyRestrictionError, setUppyRestrictionError] = React.useState<undefined | string>(undefined);

    const clearErrors = () => {
        setUppyError(false);
        setUppyRestrictionError(undefined);
    };

    React.useEffect(() => {
        const onError = () => setUppyError(true);
        const onUploadError = () => setUppyError(true);
        const onFileAdded = () => clearErrors();
        const onFileRemoved = () => clearErrors();
        const onCancelAll = () => clearErrors();
        const onRestrictionFailed = (_file: UppyFileType, error: Error) => {
            setUppyRestrictionError(error.message);
        };

        uppy.on("error", onError);
        uppy.on("upload-error", onUploadError);
        uppy.on("file-added", onFileAdded);
        uppy.on("file-removed", onFileRemoved);
        uppy.on("cancel-all", onCancelAll);
        uppy.on("restriction-failed", onRestrictionFailed);

        return () => {
            uppy.off("error", onError);
            uppy.off("upload-error", onUploadError);
            uppy.off("file-added", onFileAdded);
            uppy.off("file-removed", onFileRemoved);
            uppy.off("cancel-all", onCancelAll);
            uppy.off("restriction-failed", onRestrictionFailed);
        };
    }, [uppy]);

    let errorText: undefined | string = undefined;
    if (error) {
        errorText = error;
    }

    if (uppyError) {
        errorText = t("uppy.generalError") ?? "";
    }

    if (uppyRestrictionError) {
        errorText = uppyRestrictionError;
    }

    if (!errorText) {
        return null;
    }

    return (
        // mt: -1 will mitigate gap used by wrapper component
        <FormControl {...{ error: true, mt: -1 }}>
            <FormHelperText>{errorText}</FormHelperText>
        </FormControl>
    );
};

export { UppyError, type UppyErrorProps };
