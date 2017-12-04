import * as PropTypes from "prop-types";
import {InputContext} from "react-context-form";

export interface BaseInputMaskProps {
    maskList: string [];
    maskChar?: string;
    alwaysShowMask?: boolean;
    onCursorEnd?: (element: HTMLInputElement, context: InputContext) => void
}

export const BaseInputMaskPropTypes: {[P in keyof BaseInputMaskProps]: PropTypes.Validator<any>} = {
    maskList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    maskChar: PropTypes.string,
    alwaysShowMask: PropTypes.bool,
    onCursorEnd: PropTypes.func
};

export const BaseInputMaskDefaultProps: {[P in keyof BaseInputMaskProps]?: BaseInputMaskProps[P]} = {
    maskChar: "",
    alwaysShowMask: false
};
