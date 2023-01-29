import IMask from 'imask';

export default function (input) {
	const maskOptions = {
		mask: '+{7}(000)000-00-00'
	};
	IMask(input, maskOptions);
}
