import * as React from "react";
import * as PropTypes from "prop-types";

import {BaseInput, BaseInputDefaultProps, BaseInputProps, BaseInputPropTypes} from "react-context-form";

import * as ReactInputMask from "react-input-mask"


import {BaseInputMaskDefaultProps, BaseInputMaskProps, BaseInputMaskPropTypes} from "./BaseInputMaskProps";

export interface BaseInputMaskInterface {
    maskElement: typeof ReactInputMask;
    currentCursorPosition: number;
    currentMask: string;
    maskList: string [];
    // {[P in keyof ReactInputMaskProps]?: ReactInputMaskProps[P]};
    readonly baseProps:any;
    getCurrentMask: (valueLength: number) => string;
    setElement: (element: typeof ReactInputMask) => void;
}

export class BaseInputMask extends BaseInput<HTMLInputElement> implements BaseInputMaskInterface {
    public static readonly propTypes = {
        ...BaseInputPropTypes,
        ...BaseInputMaskPropTypes
    };
    public static readonly defaultProps: typeof BaseInputMaskDefaultProps & typeof BaseInputDefaultProps = {
        ...BaseInputDefaultProps,
        ...BaseInputMaskDefaultProps
    };

    public props: BaseInputMaskProps & BaseInputProps<HTMLInputElement>;
    public maskElement: typeof ReactInputMask;
    public currentCursorPosition: number;
    public maskList: string [];
    public currentMask: string;

    public constructor(props) {
        super(props);

        this.maskList = this.props.maskList
            .sort((prev, curr) => prev.replace(/\D/g, "").length - curr.replace(/\D/g, "").length);
    }

    public get baseProps(): any {
        return {
            ref: this.setElement,
            onPaste: this.handlePaste,
            mask: this.getCurrentMask(this.childProps.value.toString().length)
        }
    }

    public setElement = (element: typeof ReactInputMask): void => {
        if (!(element instanceof ReactInputMask)) {
            this.maskElement = undefined;
            return;
        }

        this.maskElement = element;
        if (this.childProps.ref instanceof Function) {
            this.childProps.ref(element.input);
        }
    };

    public getCurrentMask(valueLength: number): string {
        return this.maskList
            .reduce((prev: string, curr: string) => prev.replace(/\D/g, "").length > valueLength ? prev : curr);
    }

    protected handlePaste = (event: ClipboardEvent): void => {
        event.preventDefault();

        const value = event.clipboardData.getData("Text");
        if (!value) {
            return;
        }

        this.handleChange({
            currentTarget: {value}
        } as React.ChangeEvent<HTMLInputElement>);
    }
}
