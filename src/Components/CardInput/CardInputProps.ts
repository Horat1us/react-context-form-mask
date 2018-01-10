import * as PropTypes from "prop-types";

import { MaskInputPropTypes, MaskInputProps } from "../MaskInput";

export const CardInputDefaultProps = {
    mask: "999-999-999-999",
    maskChar: null
}

export const CardInputPropTypes: {[P in keyof Partial<MaskInputProps>]: PropTypes.Validator<any>} = {
    ...MaskInputPropTypes,
    mask: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
}
