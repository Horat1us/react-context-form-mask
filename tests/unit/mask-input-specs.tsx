import * as React from "react";
import { expect } from "chai";
import { ReactWrapper, mount } from "enzyme";

import { MaskInput } from "../../src/Components/MaskInput";

describe("<MaskInput/>", () => {
    let wrapper: ReactWrapper<any, undefined>;
    let DOMNode: HTMLInputElement;

    const commonHandler = () => undefined;

    const simulateChange = (value: string) => {
        wrapper.instance().context.value = value;
        wrapper.simulate("change");
        wrapper.instance().forceUpdate();
    };

    const defaultValue = "380604513512";
    const maskList = ["9999", "(999) 999-99-999", "(999) 999-9999-9999"];

    let onChangeTriggered = false;
    const onChange = () => onChangeTriggered = true;
    const onAttributeChange = commonHandler;
    const onFocus = commonHandler;
    const onMount = commonHandler;
    const onBlur = commonHandler;

    beforeEach(() => {
        const context = {
            onChange, onAttributeChange, onFocus, onMount, onBlur,
            id: "id_test",
            name: "name_test",
            value: defaultValue
        };

        wrapper = mount(<MaskInput mask={maskList} />, { context });

        DOMNode = wrapper.getDOMNode() as HTMLInputElement;
    });

    afterEach(() => {
        wrapper.unmount();
        onChangeTriggered = false;
    });

    it("Should set mask according to value length", () => {
        simulateChange("0000");
        expect(DOMNode.value).to.equal("(000) 0");

        simulateChange("0000000000");
        expect(DOMNode.value).to.equal("(000) 000-00-00");

        simulateChange("00000000000000");
        expect(DOMNode.value).to.equal("(000) 000-0000-0000");

        expect(onChangeTriggered).to.be.true;
    });


    it("Should prevent default on paste", () => {
        let defaultPrevented = false;
        wrapper.simulate("paste", {
            clipboardData: {
                getData: () => undefined
            },
            preventDefault: () => defaultPrevented = true
        });

        expect(defaultPrevented).to.be.true;
    });

    it("Should ignore paste event if data does not parsed from clipboard", () => {
        wrapper.simulate("paste", {
            clipboardData: {
                getData: () => undefined
            }
        });

        expect(onChangeTriggered).to.be.false;
    });

    it("Should trigger onChange on paste event if data exist in clipboard", () => {
        wrapper.simulate("paste", {
            clipboardData: {
                getData: () => "Some awesome data"
            }
        });

        expect(onChangeTriggered).to.be.true;
    });

    it("Should call context.onChange on ComponentDidUpdate if value was changed", () => {
        Object.defineProperty(document, "activeElement", {
            get: () => DOMNode
        });

        wrapper.instance().context.value = "Not valid data";
        wrapper.instance().forceUpdate();

        expect(onChangeTriggered).to.be.true;       

        wrapper.instance().context.value = "(000) 0";
        onChangeTriggered = false;
        wrapper.instance().forceUpdate();
        expect(onChangeTriggered).to.be.false;       
    
    });
});
