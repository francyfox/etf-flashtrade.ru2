import SVGInject from '@iconfu/svg-inject'
import swiperLoad from './libs/swiperLoad'
import mediaQuery from "./helpers/check/mediaQuery";
import headerScrollListener from "./helpers/listners/headerScrollListener"
import { accordionNonHeader } from "./helpers/listners/accordionListener"
// eslint-disable-next-line no-unused-vars
import { Popover, Collapse } from 'bootstrap'
import FormValidation from "./services/validation/FormValidation"
import setModalFormHash from "./services/forms/setModalFormHash"
import openModalByHashOnReload from "./services/forms/openModalByHashOnReload";
import flexmenu from "./services/flexmenu/flexmenu";

import 'mmenu-light/dist/mmenu-light.css'
import 'mburger-css/dist/mburger.css' // выпилить тока нужное из стилей

// import 'aos/dist/aos.css'
// import AOS from 'aos'

/*
    TODO: modernizer for webp, add webpack live hooks, needs separate scripts by pages/modules
 */

document.addEventListener(
    'DOMContentLoaded', () => {
        try {
            SVGInject(document.querySelectorAll('img.injectable'))
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e)
        }

		new FormValidation('.needs-validation');
        setModalFormHash();
        // AOS.init()
        swiperLoad();
        headerScrollListener();
    }
)
window.onload = function () {
	document.body.classList.add('loaded');
	const Menu = new flexmenu('Далее...', 'more-button', 'more-dropdown');

	if (mediaQuery.isDesktop) {
		Menu.init();
	} else {
		Menu.dropdownMobileList();
	}

	const title = document.querySelector('.accordion-services .accordion-services-item .title-h2')
	const titleHeight = title.clientHeight + 40;

	if (title !== null) {
		accordionNonHeader('.accordion-services', titleHeight);
	}

	mediaQuery.QueryDesktop().addEventListener('change', function (query) {
		if (!query.matches) {
			Menu.dropdownMobileList();
			if (title !== null) {
				accordionNonHeader('.accordion-services', titleHeight)
			}
		}
	});

	openModalByHashOnReload();
};



