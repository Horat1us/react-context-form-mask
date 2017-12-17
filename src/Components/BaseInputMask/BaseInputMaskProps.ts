import * as PropTypes from "prop-types";
import { BaseInputProps, BaseInputPropTypes} from "react-context-form";
import { ReactInputMaskInterface } from "../ReactInputMask/index";

export interface BaseInputMaskProps extends BaseInputProps<HTMLInputElement> {
    mask: string [] | string,
    maskChar?: string,
    formatChars?: string,
    alwaysShowMask?: boolean,
    maskRef?: (element: ReactInputMaskInterface) => void;
}

export const BaseInputMaskPropTypes: {[P in keyof BaseInputMaskProps]: PropTypes.Validator<any>} = {
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
