import * as React from "react";
import * as PropTypes from "prop-types";

import { toFixed } from "../../helpers/toFixed";

import { TimeInputProps, TimeInputPropTypes, TimeInputDefaultProps } from "./TimeInputProps"
import { ReactInputMask, ReactInputMaskInterface } from "../ReactInputMask";
import { MaskInput } from "../MaskInput";

export class TimeInput extends React.Component<TimeInputProps> {
    public static readonly propTypes = TimeInputPropTypes;
    public static readonly defaultProps = TimeInputDefaultProps;

    public readonly props: TimeInputProps;

    public render(): JSX.Element {
        const {
            timeFormat,
            showControls,
            onCursorEnd,
            ...props
        } = this.props;

        const inputProps = {
            ...props,
            onChange: this.handleChangeControl,
            maskRef: this.setInputConroller,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp,
            onInput: this.handleInput,
            onFocus: this.handleFocus,
            alwaysShowMask: true,
            autoComplete:"off",            
            mask: "99:99",
            maskChar: "-",
            type: "tel"
        }

        return (
            <React.Fragment>
                <MaskInput {...inputProps} />
                {this.props.showControls && this.controls}
            </React.Fragment>
        );
    }

    protected inputController: ReactInputMaskInterface;
    protected currentCursorPosition: number;

    protected get controls(): JSX.Element {
        return (
            <div className="spinner__controls">
                <button type="button" tabIndex={-1} className="btn btn_inc" onClick={this.handleIncrement} />
                <button type="button" tabIndex={-1} className="btn btn_dec" onClick={this.handleDecrement} />
            </div>
        );
    }

    protected handleIncrement = () => this.handleChangeControl(this.changeHours(1));

    protected handleDecrement = () => this.handleChangeControl(this.changeHours(-1));

    protected handleFocus = () => this.inputController.setCursorPos(0);    

    protected setInputConroller = (element: ReactInputMaskInterface): void => {
        this.inputController = element;
    }

    protected handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.currentCursorPosition = event.target.selectionStart
    };

    protected handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "ArrowDown") {
            this.inputController.setCursorPos(this.currentCursorPosition || 0);
            this.handleDecrement();
        } else if (event.key === "ArrowUp") {
            this.inputController.setCursorPos(this.currentCursorPosition || 0);
            this.handleIncrement();
        }
    };

    protected handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Tab") {
            this.inputController.setCursorPos(this.currentCursorPosition || 0);
        }
    };

    protected changeHours(value: number): React.ChangeEvent<HTMLInputElement> {
        const valuesArray = this.inputController.value.toString().split(":");
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

    protected handleChangeControl = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.currentTarget.value.replace(/-/g, "0").split(":");

        let hoursValue: string | number = Number(value[0]);
        let minutesValue: string | number = Number(value[1]);

        const { hours, minutes } = this.props.timeFormat;

        minutesValue = minutesValue > minutes ? minutes : toFixed(2, minutesValue);
        hoursValue = hoursValue > hours ? hours : toFixed(2, hoursValue);
        
        this.inputController.setInputValue(`${hoursValue}:${minutesValue}`);
        if (
            this.props.onCursorEnd && 
            this.currentCursorPosition >= this.inputController.value.toString().length
        ) {
            this.props.onCursorEnd(this.inputController.input);
        }
    };
}
