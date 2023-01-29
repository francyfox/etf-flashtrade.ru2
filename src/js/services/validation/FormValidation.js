import validateFile from "./input/validateFile";
import maskPhone from "./input/maskPhone";

/**
 * TODO: отправить в конструктор форм
 */
export default class {
    /**
     * @param {String} formsSelector
     */
    constructor(formsSelector) {
        const forms = document.querySelectorAll(formsSelector)

        Array.prototype.slice.call(forms)
            .forEach(function (form) {
				const inputs = form.elements;
				maskPhone(inputs.phone);
				validateFile(inputs.file)

                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity() ) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

					form.classList.add('was-validated')
                }, false)
            })
    }
}
