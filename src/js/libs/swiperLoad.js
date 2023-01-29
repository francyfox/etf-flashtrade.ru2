import Swiper, {Navigation, Pagination, Autoplay, EffectCreative} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/scss/effect-creative'

export default function () {
    const SwiperOutNavSelector = '.swiper-out-nav .swiper'
    const SwiperOutNav = document.querySelectorAll(SwiperOutNavSelector)

    SwiperOutNav.forEach(function (slider) {
        const prevButton = slider.parentElement.querySelector('.swiper-button-prev')
        const nextButton = slider.parentElement.querySelector('.swiper-button-next')

        if (slider.parentElement.classList.contains('text-pagination')) {
            new Swiper(slider, {
                autoHeight: true,
                speed: 1000,
                slidersPerView: 1,
				effect: "creative",
                loop: true,
				creativeEffect: {
					prev: {
						shadow: false,
						translate: ["-20%", 0, -1],
					},
					next: {
						translate: ["100%", 0, 0],
					},
				},
                // Navigation arrows
                navigation: {
                    nextEl: nextButton,
                    prevEl: prevButton,
                },
                pagination: {
                    el: '.swiper-out-nav.text-pagination .swiper-text-pagination',
                    clickable: true,
                    bulletActiveClass: 'active',
                    bulletClass: 'bullet',
                    renderBullet (index, className) {
                        const sliderNames = []
                        const slides = document.querySelectorAll('.swiper-out-nav.text-pagination .swiper .swiper-slide')
                        slides.forEach(function (item) {
                            sliderNames.push(item.dataset.name)
                        })

                        return `<button class="${className} badge badge-primary"> ${sliderNames[index]} </button>`
                    },
                },
                modules: [Navigation, Pagination, EffectCreative],
            })

        } else {
            new Swiper(slider, {
                speed: 1000,
                slidersPerView: 1,
                effect: "creative",
                grabCursor: false,
				creativeEffect: {
					prev: {
						shadow: false,
						translate: ["-130%", 0, -500],
					},
					next: {
						shadow: false,
						translate: ["130%", 0, -500],
					},
				},
                loop: true,
                // Navigation arrows
                navigation: {
                    nextEl: nextButton,
                    prevEl: prevButton,
                },
                pagination: {
                    el: slider.parentElement.querySelector('.fraction-pagination'),
                    type: 'custom',
                    renderCustom (swiper, current, total) {
                        return `<strong>${current} из ${total}</strong>`
                    }
                },
                modules: [Navigation, Pagination, Autoplay, EffectCreative],
            })
        }

    })
}

