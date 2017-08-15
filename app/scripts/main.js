'use strict';
/* global window document lory */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const navToggle = document.querySelector('#thtrm-nav-button');
  const menu = document.querySelector('#thtrm-nav-main-list');
  const testimonialWrapper = document.querySelector('#js-thtrm-testimonials');
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
  const toggleNav = (state) => {
    const isVisible = state ||
      navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';

    navToggle.setAttribute(
      'aria-expanded',
      `${isVisible}`
    );
    menu.classList.toggle('is-visible');
    return isVisible;
  };

  const hideNav = () => {
    navToggle.setAttribute(
      'aria-expanded', 'false'
    );
    menu.classList.remove('is-visible');
  };

  if (testimonialWrapper && window.lory) {
    const testimonialThumbnails =
      [...document.querySelectorAll('.js-thtrm-testimonial-trigger')];
    const testimonialGallery = lory && lory(testimonialWrapper, {
      enableMouseEvents: true,
      slidesToScroll: 1,
      slideSpeed: 500,
      ease: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    });

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
  }

  navToggle.addEventListener('click', (ev) => {
    const isVisible = toggleNav();
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    if (isVisible === 'true') {
      body.addEventListener('click', hideNav, {once: true});
    } else {
      body.removeEventListener('click', hideNav);
    }
  }, false);

  document.addEventListener('keydown', (evt) => {
    let isEscape = 'key' in evt ?
      (evt.key == 'Escape' || evt.key == 'Esc') :
      (evt.keyCode == 27);

    if (isEscape) {
      hideNav();
      body.removeEventListener('click', hideNav);
    }
  });
});
