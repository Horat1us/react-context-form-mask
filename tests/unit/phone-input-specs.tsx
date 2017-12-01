import * as React from "react";
import {expect} from "chai";
import {ReactWrapper, mount} from "enzyme";
import {PhoneInput} from "../../src/Components/PhoneInput/PhoneInput";

describe("<PhoneInput/>", () => {
    let wrapper: ReactWrapper<any, undefined>;
    let node: PhoneInput;

    const commonHandler = () => undefined;

    const simulateChange = (value: string) => {
        wrapper.instance().context.value = value;
        wrapper.find("input").simulate("input");
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

        wrapper = mount(<PhoneInput maskList={maskList}/>, {context});

        node = wrapper.instance() as any;
    });

    afterEach(() => {
        wrapper.unmount();
        onChangeTriggered = false;
    });

    it("Should set mask according to value length", () => {
        wrapper.find("input").simulate("change");
        simulateChange("0000");
        expect((wrapper.getDOMNode() as any).value).to.equal("(000) 0");

        simulateChange("0000000000");
        expect((wrapper.getDOMNode() as any).value).to.equal("(000) 000-00-00");

        simulateChange("00000000000000");
        expect((wrapper.getDOMNode() as any).value).to.equal("(000) 000-0000-0000");

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
            get: () =>  node.maskElement.input
        });

        node.maskElement.value = "Some another value";
        node.forceUpdate();

        expect(onChangeTriggered).to.be.true;
    });
});
