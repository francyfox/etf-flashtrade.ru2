import flexmenu from "./flexmenu";

export default class {
	constructor(moreText, MoreClass, MoreDrapdawnClass) {
		this.moreText = (moreText) ? moreText : '...',
			this.MoreClass = (MoreClass) ? MoreClass : 'more-button',
			this.MoreDrapdawnClass = (MoreDrapdawnClass) ? MoreDrapdawnClass : 'more-dropdawn';

		return this;
	}

	static HoverDelay(item) {
		let Time;

		item.addEventListener('mouseover', function () {
			this.classList.add('opened');

			if (Time) {
				clearTimeout(Time);
			}
		});

		item.addEventListener('mouseleave', function () {
			const folder = this;
			Time = setTimeout(function () {
				folder.classList.remove('opened');
			}, 100);
		});

	}

	dropdownMobileList() {
		const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));

		dropdownElementList.map(function (dropdownToggleEl) {
			dropdownToggleEl.addEventListener('click', function (e) {
				const subMenu = this.parentElement.querySelector('ul').classList;

				if (!subMenu.contains('opened')) {
					e.preventDefault();
				}
				subMenu.toggle('opened');
			});
		});

		return this;
	}

	// eslint-disable-next-line class-methods-use-this
	init() {
		const menu = document.querySelector('.flex-menu');
		const menuFolder = menu.querySelectorAll('li');
		//
		// 	menuOffsetWidth = menu.offsetWidth,
		// 	menuWidth = parseInt(window.getComputedStyle(menu).maxWidth.replace('px', '')), // parseInt(window.getComputedStyle(menu).maxWidth.replace('px', ''))
		//
		// 	TagsWidth = [];
		// let MaxWidth = 0;
		// const more = document.createElement('li');
		//
		// if (menuOffsetWidth < menuWidth) {
		// 	more.classList.add(this.MoreClass, 'nav-item', 'dropdown');
		//
		// 	more.innerHTML = `<a class="nav-link" href="javascript:void(0);">${this.moreText}</a><ul class="${this.MoreDrapdawnClass}"></ul>`;
		// 	menu.appendChild(more);
		// } else if (menuWidth == menuOffsetWidth) {
		// 	return;
		// }

		// eslint-disable-next-line no-unused-vars
		for (let i = 0, count = 0; i < menuFolder.length; i++) {

			// if (menuFolder[i].parentElement.classList.contains('flex-menu')) {
			//
			// 	TagsWidth[count] = menuFolder[i].offsetWidth;
			//
			// 	if (MaxWidth < menuOffsetWidth - more.offsetWidth) {
			// 		MaxWidth += TagsWidth[count];
			// 	} else {
			// 		more.querySelector(`ul.${this.MoreDrapdawnClass}`).append(menuFolder[i]);
			// 	}
			// 	count++;
			//
			// }

			flexmenu.HoverDelay(menuFolder[i]);
			// flexmenu.HoverDelay(more);
		}

		// const last = menu.children[0].childElementCount - 2;
		// more.querySelector(`ul.${this.MoreDrapdawnClass}`).prepend(menu.children[0].children[last]);
	}
}
