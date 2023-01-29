/**
 * Check on empty value
 * @param prop
 * @returns {boolean}
 */
export default function (prop) {
	switch (prop) {
		case 'undefined':
			return false;
		case null:
			return false;
		case '':
			return false;
		default:
			return true;
	}
}
