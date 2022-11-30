export function setupIntersectionObserverMock({
	root = null,
	rootMargin = "",
	thresholds = [],
	disconnect = () => null,
	observe = () => null,
	takeRecords = () => [],
	unobserve = () => null,
} = {}) {
	class MockIntersectionObserver {
		constructor() {
			this.root = root;
			this.rootMargin = rootMargin;
			this.thresholds = thresholds;
			this.disconnect = disconnect;
			this.observe = observe;
			this.takeRecords = takeRecords;
			this.unobserve = unobserve;
		}
	}

	Object.defineProperty(window, "IntersectionObserver", {
		writable: true,
		configurable: true,
		value: MockIntersectionObserver,
	});

	Object.defineProperty(global, "IntersectionObserver", {
		writable: true,
		configurable: true,
		value: MockIntersectionObserver,
	});
}
