// Add this script at the end of your index.html file, before the closing </body> tag

// Track page load time
const pageLoadTimestamp = new Date().toLocaleString();

// Function to log events
function logInteraction(timestamp, eventType, eventTarget) {
    const elementType = eventTarget.tagName.toLowerCase();
    let elementDescription = elementType;
    
    // Add more descriptive information based on element type or classes
    if (eventTarget.id) {
        elementDescription += `#${eventTarget.id}`;
    }
    if (eventTarget.className && typeof eventTarget.className === 'string') {
        elementDescription += `.${eventTarget.className.split(' ').join('.')}`;
    }
    
    // Special cases for specific element types
    if (elementType === 'img') {
        elementDescription += ` (src: ${eventTarget.src})`;
    }
    if (elementType === 'a') {
        elementDescription += ` (href: ${eventTarget.href})`;
    }
    
    console.log(`${timestamp}, ${eventType}, ${elementDescription}`);
}

// Track page views
document.addEventListener('DOMContentLoaded', function() {
    // Log initial page view
    logInteraction(pageLoadTimestamp, 'page_view', document.documentElement);
    
    // Track section views using Intersection Observer
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.5 // Trigger when 50% of section is visible
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timestamp = new Date().toLocaleString();
                logInteraction(timestamp, 'section_view', entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Track all click events
document.addEventListener('click', function(event) {
    const timestamp = new Date().toLocaleString();
    let target = event.target;
    
    // Find the most meaningful parent if clicking on something like an icon inside a button
    while (target !== document.body) {
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
            target.classList.contains('clickable') || target.onclick) {
            break;
        }
        target = target.parentElement;
    }
    
    logInteraction(timestamp, 'click', target);
}, true); // Use capture phase to catch all clicks

// Track form interactions
document.addEventListener('submit', function(event) {
    const timestamp = new Date().toLocaleString();
    logInteraction(timestamp, 'form_submit', event.target);
});

// Track carousel navigation (since you have a custom carousel)
document.addEventListener('DOMContentLoaded', function() {
    const carouselArrows = document.querySelectorAll('.carousel-arrow');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    
    carouselArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const timestamp = new Date().toLocaleString();
            logInteraction(timestamp, 'carousel_navigation', arrow);
        });
    });
    
    carouselDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const timestamp = new Date().toLocaleString();
            logInteraction(timestamp, 'carousel_navigation', dot);
        });
    });
});