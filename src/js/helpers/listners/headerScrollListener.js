export default function () {
    const headHTMLElement = document.querySelector('header');

    window.onscroll = function () {
        if (window.pageYOffset > 20) {
            headHTMLElement.classList.add('sticky')
        } else if (window.pageYOffset < 1) {
            headHTMLElement.classList.remove('sticky')
        }
    }
}
