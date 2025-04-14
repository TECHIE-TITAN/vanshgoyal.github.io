document.addEventListener('DOMContentLoaded', function() {
  // Carousel functionality
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next-arrow');
  const prevButton = document.querySelector('.prev-arrow');
  const dotsNav = document.querySelector('.carousel-dots');
  
  const slideWidth = slides[0].getBoundingClientRect().width;
  
  // Arrange slides next to each other
  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  slides.forEach(setSlidePosition);
  
  // Function to move to a specific slide
  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    
    // Apply active class to current slide and blur to others
    slides.forEach(slide => {
      slide.classList.remove('current-slide');
      slide.classList.add('blurred-slide');
    });
    
    targetSlide.classList.add('current-slide');
    targetSlide.classList.remove('blurred-slide');
    
    // Also handle the dots
    const targetIndex = slides.findIndex(slide => slide === targetSlide);
    updateDots(targetIndex);
  };
  
  // Create dots for each slide
  const createDots = () => {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active-dot');
      dot.setAttribute('data-index', index);
      dotsNav.appendChild(dot);
    });
  };
  createDots();
  
  // Update dots active state
  const updateDots = (targetIndex) => {
    const dots = Array.from(dotsNav.children);
    dots.forEach((dot, index) => {
      dot.classList.toggle('active-dot', index === targetIndex);
    });
  };
  
  // Initialize first slide as current
  slides[0].classList.add('current-slide');
  slides[0].classList.remove('blurred-slide');
  
  // Blur all other slides
  for (let i = 1; i < slides.length; i++) {
    slides[i].classList.add('blurred-slide');
  }
  
  // When I click left, move slides to the left
  prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    let prevSlide = currentSlide.previousElementSibling;
    
    // If at the beginning, loop to the end
    if (!prevSlide) {
      prevSlide = slides[slides.length - 1];
    }
    
    moveToSlide(track, currentSlide, prevSlide);
  });
  
  // When I click right, move slides to the right
  nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    let nextSlide = currentSlide.nextElementSibling;
    
    // If at the end, loop to the beginning
    if (!nextSlide) {
      nextSlide = slides[0];
    }
    
    moveToSlide(track, currentSlide, nextSlide);
  });
  
  // When I click the nav indicators, move to that slide
  dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    
    if (!targetDot) return;
    
    const currentSlide = track.querySelector('.current-slide');
    const targetIndex = parseInt(targetDot.getAttribute('data-index'));
    const targetSlide = slides[targetIndex];
    
    moveToSlide(track, currentSlide, targetSlide);
  });
  
  // Auto-play carousel
  let carouselInterval = setInterval(() => {
    nextButton.click();
  }, 5000);
  
  // Pause auto-play on hover
  const carouselContainer = document.querySelector('.carousel-container');
  
  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
  });
  
  carouselContainer.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
      nextButton.click();
    }, 5000);
  });
  
  // Scroll button functionality
  const scrollButton = document.querySelector('.carousel-scroll-btn');
  const carousel = document.getElementById('about-carousel');
  
  scrollButton.addEventListener('click', () => {
    carousel.scrollIntoView({ behavior: 'smooth' });
  });
});