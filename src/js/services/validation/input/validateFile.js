import { create, registerPlugin } from 'filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

export default function (input) {
	registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);


	return create(input, {
		name: 'file',
		maxFiles: 1,
		allowFileSizeValidation: true,
		maxFileSize: '24MB',
		acceptedFileTypes: ['image/*', 'application/pdf', 'application/xml', 'application/msword'],
		labelIdle: '<i class="fa-solid fa-file-arrow-up"></i> <span class="filepond--label-action">Выберите файл</span>&nbsp;или перетяните его',
		labelInvalidField: 'Поле содержит неверные файлы',
		labelFileLoading: 'Загрузка',
		labelButtonRemoveItem: 'Удалить',
		labelInvalidType: 'Неверный формат',
		labelMaxFileSizeExceeded: 'Файл слишком большой',
		labelMaxFileSize: 'Файл превышает максимальный размер в 24МБ'
	});
}
