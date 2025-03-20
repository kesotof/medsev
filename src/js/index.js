document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.medserver-indicator');
  const prevButton = document.querySelector('.medserver-carousel-arrow.carousel-prev');
  const nextButton = document.querySelector('.medserver-carousel-arrow.carousel-next');
  let currentIndex = 0;
  
  function showSlide(index) {
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    indicators.forEach(indicator => {
      indicator.classList.remove('active');
    });
    
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    currentIndex = index;
  }
  
  prevButton.addEventListener('click', function() {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = slides.length - 1;
    }
    showSlide(newIndex);
  });
  
  nextButton.addEventListener('click', function() {
    let newIndex = currentIndex + 1;
    if (newIndex >= slides.length) {
      newIndex = 0;
    }
    showSlide(newIndex);
  });
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      showSlide(index);
    });
  });

  setInterval(function() {
    let newIndex = currentIndex + 1;
    if (newIndex >= slides.length) {
      newIndex = 0;
    }
    showSlide(newIndex);
  }, 5000);
  inicializarCarruselMarcas();
});

function inicializarCarruselMarcas() {
  const carousel = document.querySelector('.marcas-carousel');
  if (!carousel) return;
  
  const items = document.querySelectorAll('.marcas-carousel-item');
  const prevBtn = document.querySelector('.marcas-nav-btn-prev');
  const nextBtn = document.querySelector('.marcas-nav-btn-next');
  
  let currentIndex = 0;
  const itemWidth = items[0].offsetWidth + 
                   parseInt(getComputedStyle(items[0]).marginLeft) + 
                   parseInt(getComputedStyle(items[0]).marginRight);

  const getVisibleItems = () => {
      return Math.floor(carousel.offsetWidth / itemWidth);
  };
  
  const cloneItems = () => {
      items.forEach(item => {
          const clone = item.cloneNode(true);
          carousel.appendChild(clone);
      });
  };
  
  cloneItems();
  
  const moveCarousel = (direction) => {
      if (direction === 'next') {
          currentIndex++;
      } else {
          currentIndex--;
      }
      
      if (currentIndex >= items.length) {
          carousel.style.transition = 'none';
          currentIndex = 0;
          carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
          setTimeout(() => {
              carousel.style.transition = 'transform 0.5s ease';
          }, 10);
      } else if (currentIndex < 0) {
          carousel.style.transition = 'none';
          currentIndex = items.length - 1;
          carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
          setTimeout(() => {
              carousel.style.transition = 'transform 0.5s ease';
          }, 10);
      }
      
      carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  };
  
  prevBtn.addEventListener('click', () => moveCarousel('prev'));
  nextBtn.addEventListener('click', () => moveCarousel('next'));
  
  let autoplayInterval = setInterval(() => moveCarousel('next'), 3000);

  carousel.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
  });
  
  carousel.addEventListener('mouseleave', () => {
      autoplayInterval = setInterval(() => moveCarousel('next'), 3000);
  });
  
  window.addEventListener('resize', () => {
      carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  });
}