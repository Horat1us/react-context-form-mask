import * as React from "react";
import * as PropTypes from "prop-types";
import { BaseInput } from "react-context-form";

import { ReactInputMaskInterface, ReactInputMaskProps, ReactInputMask } from "../ReactInputMask";
import { MaskInputProps, MaskInputPropTypes } from "./MaskInputProps";

export class MaskInput extends BaseInput<HTMLInputElement> {
    public static readonly propTypes = MaskInputPropTypes;

    public readonly props: MaskInputProps;

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

    public constructor(props: MaskInputProps) {
        super(props);

        if (props.mask instanceof Array) {
            this.maskList = props.mask
                .sort((prev, curr) => prev.replace(/\D/g, "").length - curr.replace(/\D/g, "").length);
        }
    }

    public render(): JSX.Element {
        return <ReactInputMask {...this.maskProps} />
    }

    protected inputController: ReactInputMaskInterface;
    protected DOMInput: HTMLInputElement;

    protected get maskProps(): ReactInputMaskProps {
        const { transform, maskRef, ...props } = this.childProps as MaskInputProps;
        return {
            ...props,
            mask: this.getCurrentMask(this.childProps.value.toString().length),
            ref: this.setElement,
            onPaste: this.handlePaste
        }
    }

    protected handlePaste = (event: React.ClipboardEvent<HTMLInputElement>): void => {
        event.preventDefault();

        const value = event.clipboardData.getData("Text");
        if (!value) {
            return;
        }

        this.handleChange({
            currentTarget: { value }
        } as React.ChangeEvent<HTMLInputElement>);
    }

    private maskList: string[] | undefined;

    private getCurrentMask(valueLength: number): string {
        return this.maskList
            ? this.maskList.reduce((prev: string, curr: string) => prev.replace(/\D/g, "").length > valueLength ? prev : curr)
            : this.props.mask as string;
    }

    private setElement = (element: HTMLInputElement | ReactInputMaskInterface): void => {
        this.props.maskRef && this.props.maskRef(element as ReactInputMaskInterface);

        if (!(element instanceof ReactInputMask)) {
            return;
        }

        this.inputController = element as ReactInputMaskInterface;
        this.DOMInput = (element as ReactInputMaskInterface).input;
        if (this.childProps.ref instanceof Function) {
            this.childProps.ref(this.DOMInput);
        }
    };
}
