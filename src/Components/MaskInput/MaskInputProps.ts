import * as React from "react";
import * as PropTypes from "prop-types";
import { BaseInputProps, BaseInputPropTypes } from "react-context-form";

import { ReactInputMaskInterface } from "../ReactInputMask/index";

export interface MaskInputProps extends React.HTMLProps<HTMLInputElement> {
    mask: string[] | string,
    maskChar?: string,
    formatChars?: {
        [propName: string]: string;
    }
    alwaysShowMask?: boolean,
    // actualy ref is (element: ReactInputMaskInterface) => void
    ref?: any;  // https://github.com/Microsoft/TypeScript/issues/16019
    maskRef?: (element: ReactInputMaskInterface) => void;
}

export const MaskInputPropTypes: {[P in keyof MaskInputProps]: PropTypes.Validator<any>} = {
    mask: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        PropTypes.string.isRequired
    ]),
    maskChar: PropTypes.string,
    formatChars: PropTypes.any,
    alwaysShowMask: PropTypes.bool,
    ref: PropTypes.func,
    maskRef: PropTypes.func
}
