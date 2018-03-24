import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import RatMarker from "../components/RatMarker";
import ratImageS from "../rat_images/rat_s.png";

it("should render a single image as a Rat Marker", () => {
  const wrapper = shallow(<RatMarker image={ratImageS} />);
  // log the rendered component
  // console.log(wrapper.debug());

  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("should render a non-selected Rat Marker without the 'selected' className", () => {
  const wrapper = shallow(<RatMarker image={ratImageS} selected={false} />);
  expect(wrapper.hasClass("selected")).toEqual(false);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("should renders a selected Rat Marker with the 'selected' className", () => {
  const wrapper = shallow(<RatMarker image={ratImageS} selected={true} />);
  // console.log(wrapper.debug());
  expect(wrapper.hasClass("selected")).toEqual(true);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
