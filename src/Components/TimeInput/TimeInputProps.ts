import * as PropTypes from "prop-types";

import { BaseInputMaskProps } from "../BaseInputMask";

export interface TimeInputProps extends React.HTMLAttributes<HTMLInputElement> {
    showControls?: boolean;
    timeFormat?: {
        hours: number,
        minutes: number
    },
    onCursorEnd?: (element: HTMLInputElement) => void
}

export const TimeInputPropTypes: {[P in keyof TimeInputProps]: PropTypes.Validator<any>} = {
    showControls: PropTypes.bool,
    timeFormat: PropTypes.shape({
        hours: PropTypes.number.isRequired,
        minutes: PropTypes.number.isRequired
    }),
    onCursorEnd: PropTypes.func
}

export const TimeInputDefaultProps: {[P in keyof TimeInputProps & BaseInputMaskProps]?: TimeInputProps[P]} = {
    showControls: true,
    timeFormat: {
        hours: 23,
        minutes: 59
    }
}
