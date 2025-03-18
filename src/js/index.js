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
  });