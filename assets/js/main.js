"use strict"

const testimonialGalleryThumbnails = [...document.querySelectorAll(".js-thtrm-testimonial-trigger")]
const testimonialGallery = new Flickity("#js-thtrm-testimonials", {
	cellSelector: ".thtrm-testimonial",
	cellAlign: "left",
	contain: true,
	pageDots: false,
	prevNextButtons: false
})

const addActiveModifierClass = htmlEl => htmlEl.classList.add("is-active")
const removeActiveModifierClass = htmlEl => htmlEl.classList.remove("is-active")
const goToSlide = flktyInstance => slideNum => flktyInstance.select(slideNum, true, false)
const updateThumbnails = xs => activeIndex => {
    xs.forEach(removeActiveModifierClass)
    addActiveModifierClass(xs[activeIndex])
}
const goToSlideTestimonialGallery = goToSlide(testimonialGallery)
const updateTestimonialGalleryThumbnails = updateThumbnails(testimonialGalleryThumbnails)

testimonialGallery.on("select", () => updateTestimonialGalleryThumbnails(testimonialGallery.selectedIndex))

testimonialGalleryThumbnails.forEach(el =>
	el.addEventListener("click", () => {
		const slideNum = +el.getAttribute("data-slide-num") - 1
		goToSlideTestimonialGallery(slideNum)
        updateTestimonialGalleryThumbnails(slideNum)
	}));
