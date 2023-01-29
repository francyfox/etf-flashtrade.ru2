/**
 * Use this for check media query
 * if u need dynamic resize check, use listener
 * mediaQuery.QueryDesktop().addEventListener('change', function (query) { if (query.matches) });
 */
export default class mediaQuery {
	static #MOBILE_SIZE = 576;
	static #TABLET_SIZE = 768;
	static #DESKTOP_SIZE = 1024;

	static #STATE_MOBILE = mediaQuery.QueryMobile().matches;
	static #STATE_TABLET = mediaQuery.QueryTablet().matches;
	static #STATE_DESKTOP = mediaQuery.QueryDesktop().matches;

	/**
	 * @param {Number} size
	 */
	static set tabletSize(size) {
		mediaQuery.#TABLET_SIZE = size;
	}

	/**
	 * @param {Number} size
	 */
	static set mobileSize(size) {
		mediaQuery.#MOBILE_SIZE = size;
	}

	/**
	 * @param {Number} size
	 */
	static set desktopSize(size) {
		mediaQuery.#DESKTOP_SIZE = size;
	}

	/**
	 * @returns {MediaQueryList}
	 */
	static QueryDesktop() {
		return window.matchMedia(`(min-width: ${mediaQuery.#DESKTOP_SIZE}px)`);
	}

	/**
	 * @returns {MediaQueryList}
	 */
	static QueryTablet() {
		return window.matchMedia(`(max-width: ${mediaQuery.#TABLET_SIZE}px)`);
	}

	/**
	 * @returns {MediaQueryList}
	 */
	static QueryMobile() {
		return window.matchMedia(`(max-width: ${mediaQuery.#MOBILE_SIZE}px)`);
	}

	/**
	 * @returns {Boolean}
	 */
	static get isDesktop() {
		return this.#STATE_DESKTOP;
	}

	/**
	 * @returns {Boolean}
	 */
	static get isMobile() {
		return this.#STATE_MOBILE;
	}

	/**
	 * @returns {Boolean}
	 */
	static get isTablet() {
		return this.#STATE_TABLET;
	}
}
