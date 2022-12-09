import { screen } from "@testing-library/react";
import mockRouter from "next-router-mock";

import Home from "../pages/home";
import Random from "../pages/random";

import Releases from "../pages/releases";

import { renderWithRedux } from "../helpers/renderWithRedux.js";
import { setupIntersectionObserverMock } from "../helpers/setupIntersectionObserverMock.js";

//Mocking next router + links
jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("ActiveLink test", () => {
	beforeEach(() => {
		setupIntersectionObserverMock();
	}),
		test("Home link", () => {
			mockRouter.push("/home");
			renderWithRedux(<Home />);
			const homeLink = screen.getByTestId("home-link");
			const randomLink = screen.getByTestId("random-link");
			const releasesLink = screen.getByTestId("releases-link");

			expect(homeLink.classList.contains("active")).toBe(true);
			expect(randomLink.classList.contains("active")).toBe(false);
			expect(releasesLink.classList.contains("active")).toBe(false);
		});

	test("Random link", () => {
		mockRouter.push("/random");
		renderWithRedux(<Random />);

		const homeLink = screen.getByTestId("home-link");
		const randomLink = screen.getByTestId("random-link");
		const releasesLink = screen.getByTestId("releases-link");

		expect(homeLink.classList.contains("active")).toBe(false);
		expect(randomLink.classList.contains("active")).toBe(true);
		expect(releasesLink.classList.contains("active")).toBe(false);
	});

	test("Releases link", () => {
		mockRouter.push("/releases");
		renderWithRedux(<Releases />);

		const homeLink = screen.getByTestId("home-link");
		const randomLink = screen.getByTestId("random-link");
		const releasesLink = screen.getByTestId("releases-link");

		expect(homeLink.classList.contains("active")).toBe(false);
		expect(randomLink.classList.contains("active")).toBe(false);
		expect(releasesLink.classList.contains("active")).toBe(true);
	});
});
