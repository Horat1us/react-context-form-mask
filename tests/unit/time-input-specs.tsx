import * as React from "react";
import { expect } from "chai";
import { ReactWrapper, mount } from "enzyme";
import { InputContextTypes } from "react-context-form";

import { TimeInput } from "../../src/Components/TimeInput";
import { MaskInput } from "../../src/Components/MaskInput";

describe("<TimeInput/>", () => {
    let wrapper: ReactWrapper<any, any>;
    let node: TimeInput;
    let DOMNode: HTMLInputElement;

    const defaultTime = ["12", "00"];

    const commonHandler = () => undefined;

    let onChangeTriggered = false;
    let onFocusTriggered = false;

    const onChange = (value) => {
        wrapper.find(MaskInput).instance().context.value = value;
        wrapper.instance().forceUpdate();
    };
    const onAttributeChange = commonHandler;
    const onFocus = () => onFocusTriggered = true;
    const onMount = commonHandler;
    const onBlur = commonHandler;

    const context = {
        onChange, onAttributeChange, onFocus, onMount, onBlur,
        id: "id_test",
        name: "name_test",
        value: defaultTime.join(":")
    };

    beforeEach(() => {
        wrapper = mount(<TimeInput showControls />, { context, childContextTypes: InputContextTypes });

        node = wrapper.instance() as any;
        DOMNode = wrapper.getDOMNode() as HTMLInputElement;
    });

    afterEach(() => {
        wrapper.unmount();
        onChangeTriggered = false;
        onFocusTriggered = false;
    });

    it("Should set default time on mount", () => {
        wrapper.simulate("keyup", {
            key: "Tab"
        });

        expect(DOMNode.value).to.equal(defaultTime.join(":"));
    });

    it("Should decrease 1 hour on click button decrement", () => {
        wrapper.find(".btn_dec").simulate("click");

        expect(DOMNode.value).to.equal(`${Number(defaultTime[0]) - 1}:${defaultTime[1]}`);
    });

    it("Should increase 1 hour on click button increment", () => {
        wrapper.find(".btn_inc").simulate("click");

        expect(DOMNode.value).to.equal(`${Number(defaultTime[0]) + 1}:${defaultTime[1]}`);
    });

    it("Should set 00:00 when input value is empty", () => {
        DOMNode.value = "";
        wrapper.simulate("change");

        expect(DOMNode.value).to.equal("00:00");
    });

    it("Should not call `context.onChange` when on unmount", () => {
        wrapper.unmount();
        (node as any).handleDecrement();
        (node as any).handleIncrement();
        (node as any).handleKeyDown();
        (node as any).handleKeyUp();
        (node as any).changeHours(1);
        (node as any).handleChangeControl({} as any);

        expect(onChangeTriggered).to.be.false;
    });

    it("Should not call `context.onFocus` when on unmount", () => {
        wrapper.unmount();
        (node as any).handleFocus();

        expect(onFocusTriggered).to.be.false;
    });


    it("Should set `00:00` when hours equal -1 on decrement", () => {
        DOMNode.value = "";
        wrapper.simulate("change");

        expect(DOMNode.value).to.equal("00:00");

        wrapper.find(".btn_dec").simulate("click");
        expect(DOMNode.value).to.equal("00:00");
    });

    it("Should set 23 hours when hours on input more than 24", () => {
        DOMNode.value = "25:00";
        wrapper.simulate("change");

        expect(DOMNode.value).to.equal("23:00");
    });

    it("Should set 59 minutes when minutes on input more than 59", () => {
        DOMNode.value = "12:61";
        wrapper.simulate("change");

        expect(DOMNode.value).to.equal("12:59");
    });

    it("Should call props.onCursorEnd if it pass when cursor on the end of input", async () => {
        wrapper.unmount();
        let triggered = false;

        wrapper = mount(<TimeInput onCursorEnd={() => triggered = true} showControls />, { context, childContextTypes: InputContextTypes });

        (wrapper.find("input").getDOMNode() as HTMLInputElement).value = "12:59";
        wrapper.find("input").simulate("input", {
            target: {
                selectionStart: 5
            }
        });

        wrapper.simulate("change");
        expect(triggered).to.be.true;
    });

    it("Should increment/decrement hours on key up/down", () => {
        wrapper.simulate("keydown", {
            key: "ArrowDown"
        });

        expect(DOMNode.value).to.equal("11:00");

        wrapper.simulate("keydown", {
            key: "ArrowUp"
        });

        expect(DOMNode.value).to.equal("12:00");
    });

    it("Should control cursor position on `tab` key press", () => {
        wrapper.simulate("keyup", {
            key: "Tab"
        });

        expect((node as any).maskInputInstance.lastCursorPos).to.equal(0);
    });

    it("Should trigger context.handleFocus on focus", () => {
        wrapper.simulate("focus");

        expect(onFocusTriggered).to.be.true;
    });
});