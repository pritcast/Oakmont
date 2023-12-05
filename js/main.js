document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel');
  let currentIndex = 0;

  function showSlide(index) {
    const newTransformValue = -index * 100 + '%';
    carousel.style.transform = 'translateX(' + newTransformValue + ')';
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % 3;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + 3) % 3;
    showSlide(currentIndex);
  }

  

  setInterval(nextSlide, 2000); // Change slide every 5 seconds
  
    // // Optional: Add navigation buttons
    // const prevButton = document.createElement('button');
    // prevButton.innerText = 'Prev';
    // prevButton.addEventListener('click', prevSlide);
  
    // const nextButton = document.createElement('button');
    // nextButton.innerText = 'Next';
    // nextButton.addEventListener('click', nextSlide);
  
    // const controls = document.createElement('div');
    // controls.appendChild(prevButton);
    // controls.appendChild(nextButton);
    // document.body.appendChild(controls);


    const wrapper = document.querySelector(".wrapper");
const propertyCarousel = document.querySelector(".property-carousel");
const firstCardWidth = propertyCarousel.querySelector(".property-card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...propertyCarousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(propertyCarousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    propertyCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    propertyCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
propertyCarousel.classList.add("no-transition");
propertyCarousel.scrollLeft = propertyCarousel.offsetWidth;
propertyCarousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        propertyCarousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    propertyCarousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = propertyCarousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    propertyCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    propertyCarousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(propertyCarousel.scrollLeft === 0) {
        propertyCarousel.classList.add("no-transition");
        propertyCarousel.scrollLeft = propertyCarousel.scrollWidth - (2 * propertyCarousel.offsetWidth);
        propertyCarousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(propertyCarousel.scrollLeft) === propertyCarousel.scrollWidth - propertyCarousel.offsetWidth) {
        propertyCarousel.classList.add("no-transition");
        propertyCarousel.scrollLeft = propertyCarousel.offsetWidth;
        propertyCarousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => propertyCarousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

propertyCarousel.addEventListener("mousedown", dragStart);
propertyCarousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
propertyCarousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


// Review Slider
const slider = document.querySelector('.review-slider');
const cardWidth = document.querySelector('.review-card').offsetWidth;
let currentReviewIndex = 0;

function showSlide(index) {
  const newTransformValue = -index * cardWidth + 'px';
  slider.style.transform = 'translateX(' + newTransformValue + ')';
}

function nextReviewSlide() {
    currentReviewIndex = (currentReviewIndex + 2) % 6;
  showSlide(currentReviewIndex);
}

function prevReviewSlide() {
    currentReviewIndex = (currentReviewIndex - 2 + 6) % 6;
  showSlide(currentReviewIndex);
}
  });


 