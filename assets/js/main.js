const testimonialGalleryThumbnails = [...document.querySelectorAll(".js-thtrm-testimonial-trigger")]
const testimonialGallery = new Flickity("#js-thtrm-testimonials", {
	cellSelector: ".thtrm-testimonial",
	cellAlign: "left",
	contain: true,
	pageDots: false,
	prevNextButtons: false
})

const toggleActiveModifierClass = htmlEl => htmlEl.classList.remove("is-active")
const goToSlide = flktyInstance => slideNum => flktyInstance.select(slideNum, true, false)
const goToSlideTestimonialGallery = goToSlide(testimonialGallery)

testimonialGalleryThumbnails.forEach(el =>
	el.addEventListener("click", () => {
		const slideNum = +el.getAttribute("data-slide-num") - 1
		goToSlideTestimonialGallery(slideNum)
		testimonialGalleryThumbnails.forEach(toggleActiveModifierClass)
		el.classList.add("is-active")
	}));
