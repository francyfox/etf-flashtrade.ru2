/**
 * Its accordion without header. Only body. Like spoiler used fixed head size
 * CSS transition not support height:auto
 * unfortunately we need to use array with accordions height items
 *
 * @param {String} className
 * @param {Number} closedHeight
 */
export function accordionNonHeader(className, closedHeight) {
	try {
		const accordion = document.querySelector(className);
		const accordionClosedHeight = [];
		[...accordion.children].forEach(function (item) {

			accordionClosedHeight.push(item.offsetHeight);

			if (!item.classList.contains('show')) {
				item.style.height = `${closedHeight}px`;
			} else {
				item.style.height = `${item.offsetHeight}px`;
			}

			item.addEventListener('click', function () {
				if (!item.classList.contains('show')) {
					const currentIndex = [...accordion.children].indexOf(this);

					if (!item.classList.contains('show')) {
						item.style.height = `${accordionClosedHeight[currentIndex]}px`;
					} else {
						item.style.height = `${item.offsetHeight}px`;
					}

					accordion.querySelector('.show').style.height = `${closedHeight}px`;
					accordion.querySelector('.show').classList.remove('show');

					this.classList.toggle('show')
				}
			});
		});
	} catch (e) {
		// eslint-disable-next-line no-console
		console.warn(e);
	}
}
