import CircleType from 'circletype'

/**
 * @param {string} circleSelector
 * @param {number} circleRadius
 */
export default function (circleSelector, circleRadius) {
    const circleHTMLElements = document.querySelectorAll(circleSelector)
    circleHTMLElements.forEach(function (item) {
		new CircleType(item)
			.radius(circleRadius);
    })
}
