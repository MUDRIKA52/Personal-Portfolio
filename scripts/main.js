

document.addEventListener("DOMContentLoaded", () => {
    // Array of texts to display in sequence
    const texts = [
      "{Hello World!}",
      "I am Mudrika Tiwari, an aspiring",
      "Full Stack Web Developer",
      "Data Analyst",
      "I am so happy to welcome you here!!"
    ];
  
    const textElement = document.getElementById("dynamic-text");
    let currentTextIndex = 0;  // Current text to display
    let currentCharIndex = 0;  // Current character of the text being typed
    let isDeleting = false;  // Whether we're typing or deleting
    let typingSpeed = 150;    // Speed of typing in ms
    let deletingSpeed = 75;   // Speed of deleting in ms
    const pauseTime = 2000;   // Pause time before deleting text (after complete text)
    const initialDelay = 1000; // Initial delay before starting typing
  
    // Function to handle typing and deleting effect
    function typeEffect() {
      const currentText = texts[currentTextIndex];
      
      // Typing effect
      if (!isDeleting) {
        textElement.innerHTML = currentText.slice(0, currentCharIndex + 1);
        currentCharIndex++;
  
        // If text is fully typed, start deleting after a delay
        if (currentCharIndex === currentText.length) {
          setTimeout(() => {
            // "Hello World!" should disappear first
            if (currentTextIndex === 0) {
              isDeleting = true;
            } else if (currentTextIndex === 1) {
              // "I am Mudrika Tiwari, an aspiring" stays visible
              setTimeout(() => {
                isDeleting = true;
              }, pauseTime);
            } else if (currentTextIndex === 2) {
              // "I am so happy to welcome you here" stays visible
              setTimeout(() => {
                isDeleting = true;
              }, pauseTime);
            } else {
              isDeleting = true;
            }
          }, pauseTime);
        }
      } else {
        // Deleting effect
        textElement.innerHTML = currentText.slice(0, currentCharIndex - 1);
        currentCharIndex--;
  
        // After deleting the entire text, move to the next text
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentTextIndex = (currentTextIndex + 1) % texts.length;
        }
      }
    }
  
    // Start the typing effect after a slight initial delay
    setTimeout(() => {
      setInterval(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
    }, initialDelay);
  });
  
// Function to handle the appearance of text as it comes into view
function handleSectionAnimation(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add class 'visible' when the element enters the viewport
      entry.target.classList.add('visible');
    }
  });
}

// Function to check when the section comes into view
const aboutSection = document.querySelector('#about');
const aboutContent = document.querySelector('.about-content');
const blobContainer = document.querySelector('.blob-container');

// Intersection Observer options
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5 // Trigger when 50% of the section is visible
};

// Intersection Observer callback function
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add 'visible' class to animate the appearance
      aboutContent.classList.add('visible');
      blobContainer.classList.add('visible');
      observer.unobserve(entry.target); // Stop observing once animation is triggered
    }
  });
};

// Create the observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Start observing the About section
observer.observe(aboutSection);
