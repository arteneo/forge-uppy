import { Box, Typography } from "@mui/material";
import ThumbnailGenerator from "@uppy/thumbnail-generator";
import { type FormikValues, type FormikProps, useFormikContext, getIn } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

import { type UppyType } from "../definitions/UppyType";

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
    getThumbnailSrc = (value: FormikValues) => {
        if (!value) {
            return undefined;
        }

        if (typeof value !== "string") {
            return undefined;
        }

        const absoluteUrlRegex = new RegExp("^(?:[a-z]+:)?//", "i");
        if (absoluteUrlRegex.test(value)) {
            return value;
        }

        if ((value as string).startsWith("/")) {
            return value;
        }

        return "/" + value;
    },
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

        const onThumbnailGenerated = (_file: unknown, preview: string) => setSrc(preview);
        uppy.on("thumbnail:generated", onThumbnailGenerated);

        return () => uppy.off("thumbnail:generated", onThumbnailGenerated);
    }, [uppy, height]);

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
            {value && src ? (
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

export { UppyThumbnail, type UppyThumbnailProps };
