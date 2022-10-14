import React from "react";
import * as Yup from "yup";
import Uppy, { UploadResult, UppyOptions } from "@uppy/core";
import Tus, { TusOptions } from "@uppy/tus";
import toArray from "@uppy/utils/lib/toArray";
import { useUppy } from "@uppy/react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { FieldInterface, useForm } from "@arteneo/forge";
import { merge } from "lodash";
import UppyType from "../definitions/UppyType";
import UppyFileType from "../definitions/UppyFileType";

interface BaseUploadChildrenProps {
    inputRef: React.RefObject<HTMLInputElement>;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fileName?: string;
    uppy: UppyType;
    addFiles: (files: UppyFileType[]) => void;
    name: string;
    path: string;
    label?: React.ReactNode;
    hasError: boolean;
    error?: string;
    help?: React.ReactNode;
    required: boolean;
    disabled: boolean;
    clear: () => void;
}

interface BaseUploadProps extends FieldInterface {
    children: (props: BaseUploadChildrenProps) => JSX.Element;
    uppyOptions?: UppyOptions;
    uppyTusOptions?: TusOptions;
    modifyUppy?: (uppy: UppyType) => void;
}

const BaseUpload = ({
    children,
    uppyOptions = {},
    uppyTusOptions = {},
    modifyUppy,
    // eslint-disable-next-line
    validate: fieldValidate = (value: any, required: boolean) => {
        if (required && !Yup.string().required().isValidSync(value)) {
            return "validation.required";
        }

        return undefined;
    },
    ...field
}: BaseUploadProps) => {
    const {
        values,
        touched,
        errors,
        submitCount,
        setFieldValue,
        registerField,
        unregisterField,
    }: FormikProps<FormikValues> = useFormikContext();
    const { resolveField } = useForm();
    const { name, path, label, error, hasError, help, required, disabled, hidden, validate } = resolveField({
        values,
        touched,
        errors,
        submitCount,
        validate: fieldValidate,
        ...field,
    });

    const getInitialFileName = () => {
        const value = getIn(values, path, "");
        if (value) {
            const valueParts = value.split("/");
            // Last element of array should be filename
            return valueParts.slice(-1)?.[0];
        }
    };

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = React.useState<undefined | string>(getInitialFileName());

    React.useEffect(() => {
        if (hidden || typeof validate === "undefined") {
            return;
        }

        registerField(path, {
            validate: () => validate,
        });

        return () => {
            unregisterField(path);
        };
    }, [hidden, registerField, unregisterField, path, validate]);

    const uppy: UppyType = useUppy(() => {
        const defaultUppyOptions = {
            restrictions: { maxNumberOfFiles: 1 },
            autoProceed: true,
        };
        const options = merge(defaultUppyOptions, uppyOptions);
        const uppy = new Uppy(options);

        const defaultUppyTusOptions = {
            endpoint: "/tus/upload",
            chunkSize: 5 * 1024 * 1024,
            limit: 1,
        };
        const tusOptions = merge(defaultUppyTusOptions, uppyTusOptions);
        uppy.use(Tus, tusOptions);

        uppy.on("file-added", (file) => {
            setFileName(file.name);
        });

        uppy.on("complete", (result: UploadResult) => {
            if (result.successful.length > 0) {
                const parts = result.successful[0].uploadURL.split("/");
                setFileName(result.successful[0].name);
                // Last element of array is a TUS token
                setFieldValue(path, parts.slice(-1)[0]);
            }

            // Any errors are handled by UI components via event subscribers

            // Cancel all to cleanup and allow user to upload next file
            // Timeout is used to let plugins i.e. ThumbnailGenerator finish their job
            setTimeout(() => {
                uppy.cancelAll();
            }, 150);
        });

        if (typeof modifyUppy !== "undefined") {
            modifyUppy(uppy);
        }

        return uppy;
    });

    if (hidden) {
        return null;
    }

    const addFiles = (files: UppyFileType[]) => {
        const descriptors = files.map((file) => ({
            name: file.name,
            type: file.type,
            data: file,
            meta: {
                // path of the file relative to the ancestor directory the user selected.
                // e.g. 'docs/Old Prague/airbnb.pdf'
                relativePath: file.relativePath || null,
            },
        }));

        try {
            uppy.addFiles(descriptors);
        } catch (err: unknown) {
            uppy.log(err as string);
        }
    };

    const clear = () => {
        uppy.cancelAll();
        setFileName(undefined);
        setFieldValue(path, "");
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = toArray(event.target.files);
        if (files.length > 0) {
            uppy.log("[DragDrop] Files selected through input");
            addFiles(files);
        }

        // We clear the input after a file is selected, because otherwise
        // change event is not fired in Chrome and Safari when a file
        // with the same name is selected.
        // ___Why not use value="" on <input/> instead?
        //    Because if we use that method of clearing the input,
        //    Chrome will not trigger change if we drop the same file twice (Issue #768).
        // null as unknown as string is done to satisfy TypeScript
        event.target.value = null as unknown as string;
    };

    return children({
        inputRef,
        onInputChange,
        fileName,
        uppy,
        addFiles,
        name,
        path,
        label,
        hasError,
        error,
        help,
        required,
        disabled,
        clear,
    });
};

export default BaseUpload;
export { BaseUploadProps };
