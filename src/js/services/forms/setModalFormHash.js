import removeHash from "../../helpers/removeHash";
import isEmpty from "../../helpers/check/isEmpty";

/**
 * TODO: отправить в конструктор форм
 */
export default function () {
	const ModalForms = document.querySelectorAll('.modal');
	[...ModalForms].forEach(function (modal) {
		if (isEmpty(modal.id)) {
			modal.addEventListener('shown.bs.modal', function () {
				window.location.hash = modal.id;
			});

			modal.addEventListener('hide.bs.modal', function () {
				removeHash();
			});
		} else {
			throw new Error('Modal form id not defined. I cant hash the form')
		}
	});
}
