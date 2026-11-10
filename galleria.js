const statoGalleria = document.querySelector("#stato-galleria");

const galleria = new Swiper(".galleria-luoghi", {
  slidesPerView: 1,
  loop: false,
  autoplay: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true
  },
  a11y: {
    prevSlideMessage: "Fotografia precedente",
    nextSlideMessage: "Fotografia successiva"
  },
  on: {
    init(swiper) {
      aggiornaStato(swiper);
    },
    slideChange(swiper) {
      aggiornaStato(swiper);
    }
  }
});

function aggiornaStato(swiper) {
  const didascalia = swiper.slides[swiper.activeIndex]
    .querySelector("figcaption h3").textContent;
  statoGalleria.textContent =
    `Fotografia ${swiper.activeIndex + 1} di ${swiper.slides.length}: ${didascalia}`;
}
