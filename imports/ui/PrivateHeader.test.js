import {Meteor} from "meteor/meteor";
import React from "react";
import expect from "expect";
import ReactTestUtils from "react-dom/test-utils";

import Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import PrivateHeader from "./PrivateHeader";

configure({ adapter: new Adapter() });

if(Meteor.isClient) {
  decribe("PrivateHeader", function() {
    it("should set button text next to logout", function() {
      const wrapper = mount(<PrivateHeader title="Some title"/>);
      const buttonText = wrapper.find("button").text();
      expect(buttonText).toBe("Logout");
    });
  });
}
