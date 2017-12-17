import * as React from "react";
import * as PropTypes from "prop-types";

import { ReactInputMask } from "../ReactInputMask";
import { BaseInputMask } from "../BaseInputMask/BaseInputMask";
import { BaseInputMaskProps } from "../BaseInputMask/BaseInputMaskProps";

export class MaskInput extends BaseInputMask {
    public componentDidUpdate() {
        if (document.activeElement !== this.DOMInput) {
            return;
        }

        this.inputController.setCursorPos(this.DOMInput.selectionStart);
        if (this.inputController.value !== this.childProps.value) {
            this.handleChange({
                currentTarget: {
                    value: this.childProps.value
                }
            } as React.ChangeEvent<HTMLInputElement>);

            this.inputController.setCursorPos(this.DOMInput.selectionStart);
        }
    }

    public render(): JSX.Element {
        return <ReactInputMask {...this.maskProps} />
    }
}
