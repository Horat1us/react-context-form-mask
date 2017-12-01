import * as React from "react";

import {toFixed} from "../../helpers/toFixed";

import {TimeInputDefaultProps, TimeInputProps, TimeInputPropTypes} from "./TimeInputProps";
import {BaseInputMask} from "../BaseInputMask/BaseInputMask";
import {ReactInputMask} from "../ReactInputMask";

export class TimeInput extends BaseInputMask {
    public static readonly defaultProps = TimeInputDefaultProps;
    public static readonly propTypes = TimeInputPropTypes;

    public props: TimeInputProps;

    public render(): JSX.Element [] {
        const {maskList, onCursorEnd, timeFormat, showControls, ...nativeProps} = this.childProps as TimeInputProps;

        const inputProps = {
            ...nativeProps,
            ...this.baseProps,
            ...{
                onChange: this.handleChangeControl,
                onKeyDown: this.handleKeyDown,
                onKeyUp: this.handleKeyUp,
                onInput: this.handleInput,
                onFocus: this.handleFocus,
                onBlur: () => undefined,
            }
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

    protected handleFocus = async (): Promise<void> => {
        this.maskElement.setCursorPos(0);

        return this.context.onFocus();
    };

    protected handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.currentCursorPosition = event.target.selectionStart
    };

    protected handleChangeControl = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
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

    protected handleKeyDown = async (event: KeyboardEvent): Promise<void> => {
        if (event.key === "ArrowDown") {
            this.maskElement.setCursorPos(this.currentCursorPosition || 0);
            await this.handleDecrement();
        } else if (event.key === "ArrowUp") {
            this.maskElement.setCursorPos(this.currentCursorPosition || 0);
            await this.handleIncrement();
        }
    };

    protected handleKeyUp = (event: KeyboardEvent): void => {
        if (event.key === "Tab") {
            this.maskElement.setCursorPos(this.currentCursorPosition || 0);
        }
    };

    protected handleIncrement = async () => {
        if (!this.maskElement) {
            return;
        }

        await this.handleChangeControl(this.changeHours(1));
    };

    protected handleDecrement = async () => {
        if (!this.maskElement) {
            return;
        }

        await this.handleChangeControl(this.changeHours(-1));
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
