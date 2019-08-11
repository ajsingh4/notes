import {Meteor} from "meteor/meteor";
import React from "react";
import expect from "expect";
import ReactTestUtils from "react-dom/test-utils";

import Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import {Login} from "./Login";

configure({ adapter: new Adapter() });

if(Meteor.isClient) {
  describe("Login", function() {
    it("should show error messages", function() {
      const error = "this is not working";
      const wrapper = shallow(<Login loginWithPassword={()=> {}}/>);
      wrapper.setState({error: error});
      expect(wrapper.find("p").text()).toBe(error);

      wrapper.setState({error: ""});
      expect(wrapper.find("p").length).toBe(0);
    });
  });
}
