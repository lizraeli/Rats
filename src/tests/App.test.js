import React from "react";
import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
// import axios from "axios";
import App from "../components/App";

const mockRats = [
  {
    created_date: "2018-03-15T00:00:00.000",
    location_type: "3+ Family Mixed Use Building",
    incident_address: "123 Sesame Street",
    location: {
      coordinates: {
        lat: 40.7128,
        lng: -73.9
      }
    }
  },
  {
    created_date: "2018-03-10T00:00:00.000",
    location_type: "Parking Lot",
    incident_address: "12 Main Street",
    location: {
      coordinates: {
        lat: 40.713,
        lng: -73.88
      }
    }
  }
];

test("Should update selected rat when onRatClick is called", () => {
  const wrapper = shallow(<App />, {
    disableLifecycleMethods: true
  });

  const rat = {
    created_date: "2018-03-15T00:00:00.000",
    location_type: "3+ Family Mixed Use Building",
    incident_address: "123 Sesame Street"
  };

  const instance = wrapper.instance();
  instance.onRatClick(rat);
  wrapper.update();

  expect(instance.state.selectedRat).toEqual(rat);
});

describe("test successful ajax call on componentdidmount", () => {
  let App, axios;

  beforeEach(() => {
    jest.resetModules();
    jest.doMock("axios", () => ({
      get: jest.fn(() =>
        Promise.resolve({
          data: mockRats
        })
      )
    }));
    axios = require("axios");
    App = require("../components/App").default;
  });

  test("Calls componentDidMount", () => {
    const spy = jest.spyOn(App.prototype, "componentDidMount");
    const wrapper = shallow(<App />);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("Renders map after successful ajax call on componentDidMount", () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();

    setImmediate(() => {
      // console.log("instance.state: ", instance.state);
      expect(instance.state.rats).toEqual(mockRats);
      // console.log(wrapper.debug());
      const mapWrapper = wrapper.find("#map-container > Map");
      expect(mapWrapper.length).toEqual(1);
      // console.log("mapwrapper: ", mapWrapper.debug());
    });
  });
});

describe("test failed ajax call on componentdidmount", () => {
  let App, axios;

  beforeEach(() => {
    jest.resetModules();
    jest.doMock("axios", () => ({
      get: jest.fn(() => Promise.reject("error"))
    }));
    App = require("../components/App").default;
    axios = require("axios");
  });

  test("Renders error message when ajax call fails on componentDidMount", () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    setImmediate(() => {
      wrapper.update();

      const mapWrapper = wrapper.find("#map-container > Map");
      expect(mapWrapper.length).toEqual(0);

      const errorWrapper = wrapper.find("#map-container > h3");
      expect(errorWrapper.length).toEqual(1);
    });
  });
});
