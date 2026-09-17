import { Alert } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { type UppyType } from "../definitions/UppyType";

interface UppyOfflineAlertProps {
    uppy: UppyType;
    disabled: boolean;
}

const UppyOfflineAlert = ({ uppy, disabled }: UppyOfflineAlertProps) => {
    const { t } = useTranslation();

    const [offline, setOffline] = React.useState(false);

    React.useEffect(() => {
        const onIsOffline = () => setOffline(true);
        const onIsOnline = () => setOffline(false);

        // Both is-offline and is-online events are not documented by Uppy but they seem to work correctly
        uppy.on("is-offline", onIsOffline);
        uppy.on("is-online", onIsOnline);

        return () => {
            uppy.off("is-offline", onIsOffline);
            uppy.off("is-online", onIsOnline);
        };
    }, [uppy]);

    if (disabled) {
        return null;
    }

    if (!offline) {
        return null;
    }

    return <Alert {...{ severity: "error" }}>{t("uppy.offlineAlert")}</Alert>;
};

export { UppyOfflineAlert, type UppyOfflineAlertProps };
