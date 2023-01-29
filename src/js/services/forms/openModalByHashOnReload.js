import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';

/**
 * TODO: отправить в конструктор форм
 */
export default function () {
	const formId = window.location.hash;
	try {
		const form = new Modal(document.querySelector(formId));
		form.show();
	} catch (e) {
		// eslint-disable-next-line no-console
		console.warn(`Cant open bootstrap modal ${formId} by hash \n ${e}`);
	}
}
