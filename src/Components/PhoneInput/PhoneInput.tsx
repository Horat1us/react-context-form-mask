import * as React from "react";

import {MaskProps, ReactInputMask} from "../ReactInputMask";
import {BaseInputMask} from "../BaseInputMask/BaseInputMask";
import {BaseInputMaskProps} from "../BaseInputMask/BaseInputMaskProps";

export class PhoneInput extends BaseInputMask {

    public componentDidUpdate() {
        if (document.activeElement !== this.maskElement.input) {
            return;
        }

        this.maskElement.setCursorPos(this.maskElement.input.selectionStart);
        if (this.maskElement.value !== this.childProps.value) {
            this.handleChange({
                currentTarget: {
                    value: this.childProps.value
                }
            } as React.ChangeEvent<HTMLInputElement>);

            this.maskElement.setCursorPos(this.maskElement.input.selectionStart);
        }
    }

    public render(): any {
        const {maskList, onCursorEnd, ...nativeProps} = this.childProps as BaseInputMaskProps;

        const inputProps: MaskProps = {
            ...nativeProps,
            ...this.baseProps,
            ...{
                onInput: this.handleChange,
                onChange: () => undefined,
                onFocus: this.handleFocus,
            }
        };

        return <ReactInputMask {...inputProps}/>
    }
}
