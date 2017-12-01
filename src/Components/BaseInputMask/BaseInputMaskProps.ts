import * as PropTypes from "prop-types";
import {BaseInputProps, InputContext} from "react-context-form";

export interface BaseInputMaskProps extends BaseInputProps<HTMLInputElement> {
    maskList: string [];
    maskChar?: string;
    alwaysShowMask?: boolean;
    onCursorEnd?: (element: HTMLInputElement, context: InputContext) => void
}

export const BaseInputMaskPropTypes = {
    maskList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    maskChar: PropTypes.string,
    alwaysShowMask: PropTypes.bool,
    onCursorEnd: PropTypes.func
};

export const BaseInputMaskDefaultProps = {
    maskChar: "",
    alwaysShowMask: false
};
