import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import ThumbnailGenerator from "@uppy/thumbnail-generator";
import UppyType from "../definitions/UppyType";

interface UppyThumbnailProps {
    // Height is required to show image in proper scale via CSS
    height: number;
    path: string;
    uppy: UppyType;
    getThumbnailSrc?: (value: FormikValues) => undefined | string;
}

const UppyThumbnail = ({
    height,
    path,
    uppy,
    getThumbnailSrc = (value: FormikValues) => (value ? "/" + value : undefined),
}: UppyThumbnailProps) => {
    const { t } = useTranslation();
    const { values }: FormikProps<FormikValues> = useFormikContext();

    const value = getIn(values, path, "");

    const [src, setSrc] = React.useState<undefined | string>(getThumbnailSrc(value));

    React.useEffect(() => {
        uppy.use(ThumbnailGenerator, {
            thumbnailHeight: height,
            waitForThumbnailsBeforeUpload: false,
        });

        uppy.on("thumbnail:generated", (file: unknown, preview: string) => setSrc(preview));

        return () => uppy.off("thumbnail:generated");
    }, []);

    React.useEffect(() => {
        if (!value) {
            setSrc(undefined);
        }
    }, [value]);

    return (
        <Box
            {...{
                sx: {
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: "grey.300",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 0.5,
                    height,
                },
            }}
        >
            {typeof src !== "undefined" ? (
                <Box
                    {...{
                        sx: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 1,
                            height: "100%",
                            width: "100%",
                            overflow: "hidden",
                        },
                    }}
                >
                    <Box
                        {...{
                            component: "img",
                            src,
                            sx: { maxWidth: "100%", maxHeight: "100%" },
                        }}
                    />
                </Box>
            ) : (
                <Typography {...{ variant: "caption", align: "center" }}>{t("uppy.thumbnail.missingImage")}</Typography>
            )}
        </Box>
    );
};

export default UppyThumbnail;
export { UppyThumbnailProps };
