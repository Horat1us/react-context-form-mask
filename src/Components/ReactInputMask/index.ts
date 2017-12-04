import * as React from "react";

export interface MaskProps {
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent) => void;
    onPaste?: (event: React.ClipboardEvent<HTMLInputElement> | ClipboardEvent) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    ref?: (element: HTMLInputElement | Mask) => void;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;

    alwaysShowMask?: boolean;
    maskChar?: string;
    mask?: string;
    value?: any;
}

export interface Mask extends React.Component<React.HTMLProps<HTMLInputElement>, undefined> {
    (props: MaskProps): JSX.Element;

    setInputValue: (newValue: string) => void;
    setCursorPos: (pos: number) => void;
    input: HTMLInputElement;
    lastCursorPos: number;
    value: string;
}

export const ReactInputMask: Mask = require("react-input-mask/lib");
