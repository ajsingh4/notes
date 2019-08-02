import {Meteor} from "meteor/meteor";
import React from "react";
import expect from "expect";
import ReactTestUtils from "react-dom/test-utils";

import Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import PrivateHeader from "./PrivateHeader";

configure({ adapter: new Adapter() });

if(Meteor.isClient) {
  describe("PrivateHeader", function() {
    it("should set button text to logout", function() {
      const wrapper = mount(<PrivateHeader title="Some title"/>);
      const buttonText = wrapper.find("button").text();
      expect(buttonText).toBe("Logout");
    });

    it("should use title prop as h1 text", function() {
      const title = "Test title here";
      const wrapper = mount(<PrivateHeader title={title}/>);
      const h1Text = wrapper.find("h1").text();
      expect(h1Text).toBe(title)
    });
  });
}
