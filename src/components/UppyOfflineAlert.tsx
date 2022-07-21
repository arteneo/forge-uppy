import React from "react";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import UppyType from "../definitions/UppyType";

interface UppyOfflineAlertProps {
    uppy: UppyType;
    disabled: boolean;
}

const UppyOfflineAlert = ({ uppy, disabled }: UppyOfflineAlertProps) => {
    const { t } = useTranslation();

    const [offline, setOffline] = React.useState(false);

    React.useEffect(() => {
        // Both is-offline and is-online events are not documented by Uppy but they seem to work correctly
        uppy.on("is-offline", () => {
            setOffline(true);
        });
        uppy.on("is-online", () => {
            setOffline(false);
        });

        return () => {
            uppy.off("is-offline");
            uppy.off("is-online");
        };
    }, []);

    if (disabled) {
        return null;
    }

    if (!offline) {
        return null;
    }

    return <Alert {...{ severity: "error" }}>{t("uppy.offlineAlert")}</Alert>;
};

export default UppyOfflineAlert;
export { UppyOfflineAlertProps };
