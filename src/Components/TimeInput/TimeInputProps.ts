import * as PropTypes from "prop-types";

import {BaseInputMaskProps} from "../BaseInputMask/BaseInputMaskProps";
import {BaseInputDefaultProps, BaseInputPropTypes} from "react-context-form";

export interface TimeInputProps extends BaseInputMaskProps {
    showControls?: boolean;
    timeFormat?: {
        hours: number,
        minutes: number
    }
}

export const TimeInputPropTypes: any = {
    ...BaseInputPropTypes,
    ...{
        showControls: PropTypes.bool,
        timeFormat: PropTypes.shape({
            hours: PropTypes.number.isRequired,
            minutes: PropTypes.number.isRequired
        })
    }
};

export const TimeInputDefaultProps = {
    ...BaseInputDefaultProps,
    ...{
        mask: "99:99",
        maskChar: "-",
        alwaysShowMask: true,
        showControls: false,
        timeFormat: {
            hours: 23,
            minutes: 59
        },
        autoComplete: "off"
    }
};
