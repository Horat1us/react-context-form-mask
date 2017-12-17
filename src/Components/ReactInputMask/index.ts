import * as React from "react";

export interface ReactInputMaskProps extends React.HTMLProps<HTMLInputElement> {
    alwaysShowMask?: boolean;
    formatChars?: string;
    maskChar?: string;
    mask: string;
}

export interface ReactInputMaskInterface extends React.Component<ReactInputMaskProps> {
    (props: ReactInputMaskProps): JSX.Element;

    setInputValue: (newValue: string) => void;
    setCursorPos: (pos: number) => void;
    input: HTMLInputElement;
    lastCursorPos: number;
    value: string;
}

let ReactInputMaskLib = require("react-input-mask");

export const ReactInputMask: ReactInputMaskInterface =
    "default" in ReactInputMaskLib
        ? ReactInputMaskLib["default"]
        : ReactInputMaskLib;
