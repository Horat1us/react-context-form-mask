import * as PropTypes from "prop-types";

import {MaskProps} from "../ReactInputMask/index";

export interface TimeInputProps {
    showControls?: boolean;
    timeFormat?: {
        hours: number,
        minutes: number
    }
}

export const TimeInputPropTypes: {[P in keyof TimeInputProps]: PropTypes.Validator<any>} = {
    showControls: PropTypes.bool,
    timeFormat: PropTypes.shape({
        hours: PropTypes.number.isRequired,
        minutes: PropTypes.number.isRequired
    })
};

export const TimeInputDefaultProps: {[P in keyof TimeInputProps & MaskProps]?: (TimeInputProps & MaskProps)[P]} = {
    mask: "99:99",
    maskChar: "-",
    alwaysShowMask: true,
    showControls: false,
    timeFormat: {
        hours: 23,
        minutes: 59
    },
    autoComplete: "off"
};
