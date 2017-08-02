'use strict';
/* global document lory */
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('#thtrm-nav-button');
  const menu = document.querySelector('#thtrm-nav-main-list');
  const testimonialWrapper = document.querySelector('#js-thtrm-testimonials');
  const testimonialThumbnails =
    [...document.querySelectorAll('.js-thtrm-testimonial-trigger')];
  const testimonialGallery = lory(testimonialWrapper, {
    enableMouseEvents: true,
    slidesToScroll: 1,
    slideSpeed: 500,
    ease: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  });

  const addActiveModifierClass = (htmlEl) =>
    htmlEl.classList.add('is-active');
  const removeActiveModifierClass = (htmlEl) =>
    htmlEl.classList.remove('is-active');
  const goToSlide = (instance) => (slideNum) =>
    instance.slideTo(slideNum);
  const updateThumbnails = (xs) => (activeIndex) => {
    xs.forEach(removeActiveModifierClass);
    addActiveModifierClass(xs[activeIndex]);
  };
  const goToSlideTestimonialGallery = goToSlide(testimonialGallery);
  const updateTestimonialThumbnails = updateThumbnails(testimonialThumbnails);

  testimonialWrapper.addEventListener('after.lory.slide', (ev) => {
    updateTestimonialThumbnails(ev.detail.currentSlide);
  });

  testimonialThumbnails.forEach((el) =>
    el.addEventListener('click', () => {
      const slideNum = Number(el.getAttribute('data-slide-num')) - 1;
      goToSlideTestimonialGallery(slideNum);
    }));

  navToggle.addEventListener('click', () => {
    navToggle.setAttribute(
      'aria-expanded',
      `${!navToggle.getAttribute('aria-expanded')}`
    );
    menu.classList.toggle('is-visible');
  });
});
