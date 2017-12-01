import * as React from "react";

export interface MaskProps {
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent) => Promise<void> | void;
    onPaste?: (event: React.ClipboardEvent<HTMLInputElement> | ClipboardEvent) => Promise<void> | void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent) => Promise<void> | void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void> | void;
    onInput?: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void> | void;
    ref?: (element: HTMLInputElement | Mask) => void;
    onFocus?: () => Promise<void> | void;
    onBlur?: () => Promise<void> | void;

    alwaysShowMask?: boolean;
    maskChar?: string;
    mask?: string;
    value?: any;
}

interface Mask extends React.Component<React.HTMLProps<HTMLInputElement>, undefined> {
    (props: MaskProps): JSX.Element;

    setInputValue: (newValue: string) => void;
    setCursorPos: (pos: number) => void;
    input: HTMLInputElement;
    lastCursorPos: number;
    value: string;
}

export const ReactInputMask: Mask = require("react-input-mask/lib");
