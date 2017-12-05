import * as React from "react";

export = reactInputMask;

declare namespace reactInputMask {
    interface ReactInputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
        /**
         * Mask string. Format characters are:
         * * `9`: `0-9`
         * * `a`: `A-Z, a-z`
         * * `\*`: `A-Z, a-z, 0-9`
         *
         * Any character can be escaped with backslash, which usually will appear as double backslash in JS strings.
         * For example, German phone mask with unremoveable prefix +49 will look like `mask="+4\\9 99 999 99"` or `mask={"+4\\\\9 99 999 99"}`
         */
        mask: string;
        /**
         * Character to cover unfilled editable parts of mask. Default character is "_". If set to null, unfilled parts will be empty, like in ordinary input.
         */
        maskChar?: string | null;
        /**
         * Defines format characters with characters as keys and corresponding RegExp string as values. Default ones:
         * ```
         * {
         *   "9": "[0-9]",
         *   "a": "[A-Za-z]",
         *   "*": "[A-Za-z0-9]"
         * }```
         */
        formatChars?: { [key: string]: string };
        /**
         * Show mask even in empty input without focus.
         */
        alwaysShowMask?: boolean;
    }

    class ReactInputMask extends React.Component<ReactInputMaskProps> {
        new(props: ReactInputMaskProps): JSX.Element;

        setInputValue: (newValue: string) => void;
        setCursorPos: (pos: number) => void;

        input: HTMLInputElement;
        lastCursorPos: number;
        value: string;
    }
}
