import React from "react";
import { InputAdornment, TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Button, IconButton } from "@arteneo/forge";

interface UppyPrettyInputProps {
    inputRef: React.RefObject<HTMLInputElement>;
    fileName?: string;
    label?: React.ReactNode;
    hasError: boolean;
    placeholder?: string;
    help?: React.ReactNode;
    required: boolean;
    disabled: boolean;
    clear: () => void;
    fieldProps?: TextFieldProps;
    textFileEmptyLabel?: string;
    textFileEmptyDisabledLabel?: string;
    textFileNameLabel?: string;
    clearTooltip?: string;
    buttonLabel?: string;
}

const UppyPrettyInput = ({
    inputRef,
    fileName,
    label,
    hasError,
    placeholder,
    required,
    disabled,
    help,
    clear,
    fieldProps,
    textFileEmptyLabel = "uppy.prettyInput.textFileEmpty",
    textFileEmptyDisabledLabel = "uppy.prettyInput.textFileEmptyDisabled",
    textFileNameLabel = "uppy.prettyInput.textFileName",
    clearTooltip = "uppy.prettyInput.clear",
    buttonLabel = "uppy.prettyInput.button",
}: UppyPrettyInputProps) => {
    const { t } = useTranslation();

    const onClick = () => {
        if (inputRef?.current) {
            inputRef.current.click();
        }
    };

    let textValue = t(textFileEmptyLabel);

    if (disabled) {
        textValue = t(textFileEmptyDisabledLabel);
    }

    if (typeof fileName !== "undefined") {
        textValue = t(textFileNameLabel, { fileName });
    }

    const hasFile = typeof fileName !== "undefined" ? true : false;

    const internalFieldProps: TextFieldProps = {
        value: textValue,
        error: hasError,
        label,
        placeholder,
        required,
        disabled,
        helperText: help,
        ...fieldProps,
        inputProps: {
            onClick: hasFile || disabled ? undefined : onClick,
            ...(fieldProps?.inputProps ?? {}),
            sx: {
                cursor: hasFile || disabled ? undefined : "pointer",
                ...(fieldProps?.inputProps?.sx ?? {}),
            },
        },
        InputProps: {
            endAdornment: !disabled ? (
                <InputAdornment {...{ position: "end", sx: { gap: 1 } }}>
                    {hasFile && (
                        <IconButton
                            {...{
                                icon: <Close {...{ fontSize: "small" }} />,
                                tooltip: clearTooltip,
                                color: "error",
                                size: "small",
                                onClick: () => clear(),
                            }}
                        />
                    )}
                    <Button
                        {...{
                            label: buttonLabel,
                            variant: "outlined",
                            color: "primary",
                            size: "small",
                            onClick,
                        }}
                    />
                </InputAdornment>
            ) : undefined,
            ...(fieldProps?.InputProps ?? {}),
        },
    };

    const mergedFieldProps = Object.assign(internalFieldProps, fieldProps);

    return <MuiTextField {...mergedFieldProps} />;
};

export default UppyPrettyInput;
export { UppyPrettyInputProps };
