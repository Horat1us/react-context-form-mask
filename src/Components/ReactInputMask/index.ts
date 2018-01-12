import * as React from "react";

export interface ReactInputMaskProps extends React.HTMLProps<HTMLInputElement> {
    alwaysShowMask?: boolean;
    formatChars?: {
        [propName: string]: string;
    },
    maskChar?: string;
    mask: string;
    ref?: (element: ReactInputMaskInterface) => void
}

export interface ReactInputMaskInterface extends HTMLInputElement {
    setInputValue: (newValue: string) => void;
    setCursorPos: (pos: number) => void;
    input: HTMLInputElement;
    lastCursorPos: number;
};

let ReactInputMaskLib = require("react-input-mask");

if ("default" in ReactInputMaskLib) {
    // tslint:disable-next-line
    ReactInputMaskLib = ReactInputMaskLib["default"];
}

export const ReactInputMask:
    new (props: ReactInputMaskProps) =>
        ReactInputMaskInterface & React.Component<ReactInputMaskProps> = ReactInputMaskLib;
