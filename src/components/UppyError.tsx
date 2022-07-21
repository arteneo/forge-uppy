import React from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { useTranslation } from "react-i18next";
import UppyType from "../definitions/UppyType";
import UppyFileType from "../definitions/UppyFileType";

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
        uppy.on("error", () => setUppyError(true));
        uppy.on("upload-error", () => setUppyError(true));
        uppy.on("file-added", () => clearErrors());
        uppy.on("file-removed", () => clearErrors());
        uppy.on("cancel-all", () => clearErrors());
        uppy.on("restriction-failed", (file: UppyFileType, error: Error) => {
            setUppyRestrictionError(error.message);
        });

        return () => {
            uppy.off("error");
            uppy.off("upload-error");
            uppy.off("file-added");
            uppy.off("file-removed");
            uppy.off("cancel-all");
            uppy.off("restriction-failed");
        };
    }, []);

    let errorText: undefined | string = undefined;
    if (error) {
        errorText = error;
    }

    if (uppyError) {
        errorText = t("uppy.generalError");
    }

    if (uppyRestrictionError) {
        errorText = uppyRestrictionError;
    }

    if (!errorText) {
        return null;
    }

    return (
        <FormControl {...{ error: true }}>
            <FormHelperText>{errorText}</FormHelperText>
        </FormControl>
    );
};

export default UppyError;
export { UppyErrorProps };
