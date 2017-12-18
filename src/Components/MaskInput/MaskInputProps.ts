import * as PropTypes from "prop-types";
import { BaseInputProps, BaseInputPropTypes } from "react-context-form";
import { ReactInputMaskInterface } from "../ReactInputMask/index";

export interface MaskInputProps extends BaseInputProps<HTMLInputElement> {
    mask: string[] | string,
    maskChar?: string,
    formatChars?: string,
    alwaysShowMask?: boolean,
    maskRef?: (element: ReactInputMaskInterface) => void;
}

export const MaskInputPropTypes: {[P in keyof MaskInputProps]: PropTypes.Validator<any>} = {
    mask: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        PropTypes.string.isRequired
    ]),
    maskChar: PropTypes.string,
    formatChars: PropTypes.string,
    alwaysShowMask: PropTypes.bool,
    maskRef: PropTypes.func,
    ...BaseInputPropTypes
}
