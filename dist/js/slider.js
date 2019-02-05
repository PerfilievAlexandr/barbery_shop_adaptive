'use strict'

const slides = document.querySelectorAll('.advanteges__item')
const labels = document.querySelectorAll('.advanteges__toggles .slider__toggle')

labels.forEach((label, index) => {
		label.addEventListener('click', () => {

			hideSlides()
			slides[index].style.display = 'block'
			label.classList.add('slider__toggle--active')

		})
	})

function hideSlides() {
	slides.forEach((slide) => slide.style.display = 'none')
	labels.forEach((label) => label.classList.remove('slider__toggle--active'))
}
