import {Meteor} from "meteor/meteor";
import React from "react";
import expect from "expect";
import ReactTestUtils from "react-dom/test-utils";

import Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import {PrivateHeader} from "./PrivateHeader";

configure({ adapter: new Adapter() });

if(Meteor.isClient) {
  describe("PrivateHeader", function() {
    it("should set button text to logout", function() {
      const wrapper = mount(<PrivateHeader title="Some title" handleLogout={() => {}}/>);
      const buttonText = wrapper.find("button").text();
      expect(buttonText).toBe("Logout");
    });

    it("should use title prop as h1 text", function() {
      const title = "Test title here";
      const wrapper = mount(<PrivateHeader title={title} handleLogout={() => {}}/>);
      const h1Text = wrapper.find("h1").text();
      expect(h1Text).toBe(title)
    });

    // it("should call the function", function() {
    //   const spy = expect.createSpy();
    //   spy(3, 4, 123);
    //   expect(spy).toHaveBeenCalledWith(3);
    // });

    it("should call handlelogout on click", function() {
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title="Title" handleLogout={spy}/>);
      wrapper.find("button").simulate("click");
      expect(spy).toHaveBeenCalled();
    });
  });
}
