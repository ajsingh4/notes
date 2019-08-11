import {Meteor} from "meteor/meteor";
import React from "react";
import {MemoryRouter} from 'react-router-dom';
import expect from "expect";
import ReactTestUtils from "react-dom/test-utils";

import Adapter from "enzyme-adapter-react-16";
import {configure, shallow, mount} from "enzyme";
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

    it("should call loginWithPassword with form data", function() {
      const email = "aj@test.com";
      const password = "password123";
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
           <Login loginWithPassword={spy}/>
        </MemoryRouter>
      );

      wrapper.find({type: "email"}).instance().value = email;
      wrapper.find({type: "password"}).instance().value = password;
      wrapper.find("form").simulate("submit");
      expect(spy).toHaveBeenCalled();
      expect(spy.calls[0].arguments[0]).toEqual({email});
      expect(spy.calls[0].arguments[1]).toEqual(password);
    });

    //Test when the function gets called with an error, it gets set on state
    it("should set loginWithPassword callback errors", function() {
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
           <Login loginWithPassword={spy}/>
        </MemoryRouter>
      );

      wrapper.find('form').simulate('submit');
      spy.calls[0].arguments[2]({error: 'Error'});
      expect(wrapper.find(Login).instance().state).toNotEqual({});
      spy.calls[0].arguments[2]();
      expect(wrapper.find(Login).instance().state).toEqual({error: ''});
    });
  });
}
