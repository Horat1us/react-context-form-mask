import * as React from "react";
import { FormGroupContext, FormGroupContextValue } from "react-context-form";
import { MaskInput, MaskInputProps } from "../MaskInput";

export const CardInputDefaultProps = {
    mask: "9999-9999-9999-9999",
    // tslint:disable-next-line
    maskChar: null
};

export class CardInput extends React.Component<Partial<MaskInputProps>> {
    public static readonly defaultProps = CardInputDefaultProps;
    public static readonly contextType = FormGroupContext;

    public readonly context: FormGroupContextValue;

    public render(): JSX.Element {
        return (
            <FormGroupContext.Provider value={this.childContextValue}>
                <MaskInput {...this.props as MaskInputProps} />
            </FormGroupContext.Provider>
        )
    }

    public get childContextValue(): FormGroupContextValue {
        return {
            ...this.context,
            id: `numberCard_${this.context.id}`
        };
    }
}
