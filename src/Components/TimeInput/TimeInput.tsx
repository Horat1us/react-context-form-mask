import * as React from "react";
import * as PropTypes from "prop-types";
import {InputContext, TransformTypes} from "react-context-form";

import {toFixed} from "../../helpers/toFixed";

import {TimeInputDefaultProps, TimeInputProps, TimeInputPropTypes} from "./TimeInputProps";
import {BaseInputMaskProps} from "../BaseInputMask/BaseInputMaskProps";
import {BaseInputMask} from "../BaseInputMask/BaseInputMask";
import * as ReactInputMask from "react-input-mask"


export class TimeInput extends BaseInputMask {
    public static readonly defaultProps = {
        ...BaseInputMask.defaultProps,
        ...TimeInputDefaultProps
    };
    public static readonly propTypes = {
        ...BaseInputMask.propTypes,
        ...TimeInputPropTypes
    };

    public props: TimeInputProps & BaseInputMaskProps;

    public render(): JSX.Element [] {
        const {
            maskList,
            onCursorEnd,
            timeFormat,
            showControls,
            ...nativeProps
        } = this.childProps as TimeInputProps & BaseInputMaskProps;
        //{[P in keyof ReactInputMaskProps]?: ReactInputMaskProps[P]}
        const inputProps:any  = {
            ...nativeProps,
            ...this.baseProps,
            onChange: this.handleChangeControl,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp,
            onInput: this.handleInput,
            onFocus: this.handleFocus,
            onBlur: () => undefined
        };

        // tslint:disable:jsx-wrap-multiline
        return [
            <ReactInputMask {...inputProps} key="input"/>,
            this.props.showControls && this.Controls
        ];
    }

    protected get Controls(): JSX.Element {
        return (
            <div className="spinner__controls" key="controls">
                <button type="button" tabIndex={-1} className="btn btn_inc" onClick={this.handleIncrement}/>
                <button type="button" tabIndex={-1} className="btn btn_dec" onClick={this.handleDecrement}/>
            </div>
        );
    }

    protected handleFocus = (): void => {
        this.maskElement.setCursorPos(0);

        return this.context.onFocus();
    };

    protected handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.currentCursorPosition = event.target.selectionStart
    };

    protected handleChangeControl = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.currentTarget.value.replace(/-/g, "0").split(":");

        let hoursValue: string | number = Number(value[0]);
        let minutesValue: string | number = Number(value[1]);

        const {hours, minutes} = this.props.timeFormat;

        minutesValue = minutesValue > minutes ? minutes : toFixed(2, minutesValue);
        hoursValue = hoursValue > hours ? hours : toFixed(2, hoursValue);

        if (
            this.currentCursorPosition >= this.childProps.value.toString().length
            && (typeof this.props.onCursorEnd).toLowerCase() === "function"
        ) {
            this.props.onCursorEnd(this.maskElement.input, this.context);
        }

        return this.context.onChange(`${hoursValue}:${minutesValue}`);
    };

    protected handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key === "ArrowDown") {
            this.maskElement.setCursorPos(this.currentCursorPosition || 0);
            this.handleDecrement();
        } else if (event.key === "ArrowUp") {
            this.maskElement.setCursorPos(this.currentCursorPosition || 0);
            this.handleIncrement();
        }
    };

    protected handleKeyUp = (event: KeyboardEvent): void => {
        if (event.key === "Tab") {
            this.maskElement.setCursorPos(this.currentCursorPosition || 0);
        }
    };

    protected handleIncrement = (): void => {
        if (!this.maskElement) {
            return;
        }

        this.handleChangeControl(this.changeHours(1));
    };

    protected handleDecrement = (): void => {
        if (!this.maskElement) {
            return;
        }

        this.handleChangeControl(this.changeHours(-1));
    };

    protected changeHours(value: number): React.ChangeEvent<HTMLInputElement> {
        const valuesArray = this.childProps.value.toString().split(":");
        let hours = toFixed(2, (Number(valuesArray[0]) + value));

        if (Number(hours) < 0) {
            hours = toFixed(2, 0);
        }

        return {
            currentTarget: {
                value: `${hours}:${valuesArray[1]}`
            }
        } as React.ChangeEvent<HTMLInputElement>;
    }
}
