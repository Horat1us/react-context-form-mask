import * as React from "react";
import * as PropTypes from "prop-types";
import { BaseInput } from "react-context-form";

import { ReactInputMaskInterface, ReactInputMaskProps, ReactInputMask } from "../ReactInputMask";
import { MaskInputProps, MaskInputPropTypes } from "./MaskInputProps";

export class MaskInput extends BaseInput<MaskInputProps> {
    public static readonly propTypes = MaskInputPropTypes;

    protected maskInputInstance: ReactInputMaskInterface;

    private maskList: string[] | undefined;

    public constructor(props) {
        super(props);

        if (props.mask instanceof Array) {
            this.maskList = props.mask
                .sort((prev, curr) => prev.replace(/\D/g, "").length - curr.replace(/\D/g, "").length);
        }
    }

    public componentDidMount() {
        const setInputValue = this.maskInputInstance.setInputValue;

        /* *
         * Call context property `onChange` directly, instead of `this.handleChange`,
         * that makes recursion in cases when the native `onChange` event is called
         * */
        this.maskInputInstance.setInputValue = (newValue: string): void => {
            setInputValue(newValue);
            this.context.onChange(newValue);
        }
    }

    public componentDidUpdate() {
        if (document.activeElement !== this.maskInputInstance.input) {
            return;
        }

        this.maskInputInstance.setCursorPos(this.maskInputInstance.input.selectionStart);

        if (this.maskInputInstance.value !== this.childProps.value) {
            this.handleChange({
                currentTarget: {
                    value: this.childProps.value
                }
            } as React.ChangeEvent<HTMLInputElement>);

            this.maskInputInstance.setCursorPos(this.maskInputInstance.input.selectionStart);
        }
    }

    public render(): JSX.Element {
        return <ReactInputMask {...this.maskProps} />
    }

    protected get maskProps(): ReactInputMaskProps {
        const { maskRef, ...rest } = this.childProps;
        return {
            ...rest,
            mask: this.getCurrentMask(this.childProps.value.toString().length),
            ref: this.setElement,
            onPaste: this.handlePaste,
            maskChar: this.childProps.maskChar || null
        };
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

    private getCurrentMask(valueLength: number): string {
        return this.maskList
            ? this.maskList.reduce((prev: string, curr: string) => prev.replace(/\D/g, "").length > valueLength ? prev : curr)
            : this.props.mask as string;
    }

    private setElement = (element: ReactInputMaskInterface): void => {
        // react does not recognize `ref` prop, instead recommended use custom prop
        if (this.props.maskRef instanceof Function) {
            this.props.maskRef(element);
        }

        if (element instanceof ReactInputMask) {
            this.maskInputInstance = element;

            // pass dom element to context form
            this.childProps.ref(this.maskInputInstance.input);
        }
    };
}
