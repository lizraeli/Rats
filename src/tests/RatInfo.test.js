import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import RatInfo from "../components/RatInfo";
import { formatCreatedDate } from "../utils/utils";

it("Should render a div with 3 child divs", () => {
  const rat = {
    created_date: "2018-03-15T00:00:00.000",
    location_type: "3+ Family Mixed Use Building",
    incident_address: "123 Sesame Street"
  };

  const wrapper = shallow(<RatInfo rat={rat} />);
  const divChildrenOfDiv = wrapper.find("div > div");
  expect(divChildrenOfDiv.length).toEqual(3);
});

it("Should render date spotted", () => {
  const ratWithValidDate = {
    created_date: "2018-03-15T00:00:00.000",
    location_type: "3+ Family Mixed Use Building",
    incident_address: "123 Sesame Street"
  };

  const wrapper = shallow(<RatInfo rat={ratWithValidDate} />);
  const dateWrapper = wrapper.find("#date");
  expect(dateWrapper.length).toEqual(1);
  const formattedDate = formatCreatedDate(ratWithValidDate.created_date);
  expect(dateWrapper.text().trim()).toEqual(`Spotted on: ${formattedDate}`);
});

it("Should render '-' for date spotted if rat has no date", () => {
  const ratWithoutDate = {
    location_type: "3+ Family Mixed Use Building",
    incident_address: "123 Sesame Street"
  };
  const wrapper = shallow(<RatInfo rat={ratWithoutDate} />);
  const dateWrapper = wrapper.find("#date");

  expect(dateWrapper.length).toEqual(1);
  expect(dateWrapper.text().trim()).toEqual(`Spotted on: -`);
});

it("Should render '-' for date spotted if rat has date with unsupported format", () => {
  const ratWithInvalidDate = {
    created_date: "03-15-2018T00:00:00.000",
    location_type: "3+ Family Mixed Use Building",
    incident_address: "123 Sesame Street"
  };

  const wrapper = shallow(<RatInfo rat={ratWithInvalidDate} />);
  const dateWrapper = wrapper.find("#date");
  expect(dateWrapper.length).toEqual(1);
  expect(dateWrapper.text().trim()).toEqual(`Spotted on: -`);
});