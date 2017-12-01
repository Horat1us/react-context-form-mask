import * as React from "react";

export interface MaskProps extends React.HTMLProps<HTMLInputElement> {
    onPaste: (event: React.ClipboardEvent<HTMLInputElement> | ClipboardEvent) => Promise<void>;
    onInput: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    onFocus: () => Promise<void>;
    onChange: () => undefined;

    ref: (element: HTMLInputElement | Mask) => any;
    alwaysShowMask: boolean;
    maskChar: string;
    mask: string;
    value: any;
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
