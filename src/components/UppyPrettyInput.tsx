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
    // TODO Text label?
    // TODO clearIconButtonProps
    // TODO buttonProps
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
}: UppyPrettyInputProps) => {
    const { t } = useTranslation();

    const onClick = () => {
        if (inputRef?.current) {
            inputRef.current.click();
        }
    };

    let textValue = t("uppy.prettyInput.textFileEmpty");

    if (disabled) {
        textValue = t("uppy.prettyInput.textFileEmptyDisabled");
    }

    if (typeof fileName !== "undefined") {
        textValue = t("uppy.prettyInput.textFileName", { fileName });
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
                                tooltip: "uppy.prettyInput.clear",
                                color: "error",
                                size: "small",
                                onClick: () => clear(),
                            }}
                        />
                    )}
                    <Button
                        {...{
                            label: "uppy.prettyInput.button",
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
