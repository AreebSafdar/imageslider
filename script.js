const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const slidesTrack = document.getElementById('slides');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let autoplayId;

function showSlide(index) {
  const totalSlides = slides.length;
  currentIndex = (index + totalSlides) % totalSlides;

  slidesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentIndex);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentIndex);
  });
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function startAutoPlay() {
  stopAutoPlay();
  autoplayId = setInterval(nextSlide, 4200);
}

function stopAutoPlay() {
  if (autoplayId) {
    clearInterval(autoplayId);
    autoplayId = null;
  }
}

prevBtn.addEventListener('click', () => {
  prevSlide();
  startAutoPlay();
});

nextBtn.addEventListener('click', () => {
  nextSlide();
  startAutoPlay();
});

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const dotIndex = Number(dot.dataset.index);
    showSlide(dotIndex);
    startAutoPlay();
  });
});

const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', stopAutoPlay);
slider.addEventListener('mouseleave', startAutoPlay);
slider.addEventListener('focusin', stopAutoPlay);
slider.addEventListener('focusout', startAutoPlay);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
});

showSlide(0);
startAutoPlay();
