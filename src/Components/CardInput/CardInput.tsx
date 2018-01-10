import * as React from "react";
import * as PropTypes from "prop-types";
import { InputContextTypes, FormGroupContextTypes, FormGroupContext, InputContext } from "react-context-form";

import { CardInputDefaultProps, CardInputPropTypes } from "./CardInputProps"
import { MaskInput, MaskInputProps } from "../MaskInput";

export class CardInput extends React.Component<Partial<MaskInputProps>> {
    public static readonly defaultProps = CardInputDefaultProps;
    public static readonly propTypes = CardInputPropTypes;
    public static readonly contextTypes = InputContextTypes;
    public static readonly childContextTypes = FormGroupContextTypes;

    public readonly context: InputContext;

    public getChildContext(): FormGroupContext {
        return {
            ...this.context,
            id: `numberCard_${this.context.id}`
        }
    }

    public render(): JSX.Element {
        return (
            <MaskInput {...this.props as MaskInputProps} />
        )
    }
}