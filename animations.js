document.addEventListener('DOMContentLoaded', function() {
    // Page loading animation
    setTimeout(function() {
        document.querySelector('.loader').classList.add('fade-out');
        document.body.classList.remove('loading');
    }, 1500);

    // Smooth scroll for nav links
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.hash) {
                e.preventDefault();
                
                // Get target section
                const target = document.querySelector(this.hash);
                if (!target) return;
                
                // Temporarily disable scroll observer
                sectionObserver.disconnect();
                
                // Smooth scroll to section
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
                
                // Reset and animate target section after scroll completes
                setTimeout(() => {
                    resetAndAnimateSection(target);
                    sectionObserver.observe(target);
                }, 1000); // Matches scroll duration
            }
        });
    });

    // Section observer with animation logic
    const sections = document.querySelectorAll('section');
    let sectionObserver;
    
    function initObserver() {
        sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    resetAndAnimateSection(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Improved section animation with direction awareness
    function resetAndAnimateSection(section) {
        // Don't re-animate if already visible
        if (section.classList.contains('active-section')) return;
        
        // Mark all sections as inactive
        sections.forEach(s => s.classList.remove('active-section'));
        
        // Mark current section as active
        section.classList.add('active-section');
        
        // Reset animation classes
        const animElements = section.querySelectorAll('[class*="animate-"]');
        animElements.forEach(el => {
            el.classList.remove('show');
            void el.offsetWidth; // Trigger reflow
        });

        // Animate with staggered delays
        setTimeout(() => {
            section.classList.add('show');
            
            const textElements = section.querySelectorAll('.animate-text');
            const imgElements = section.querySelectorAll('.animate-img');
            const btnElements = section.querySelectorAll('.animate-btn');
            
            textElements.forEach((el, i) => {
                setTimeout(() => el.classList.add('show'), 100 * i);
            });
            
            imgElements.forEach((el, i) => {
                setTimeout(() => el.classList.add('show'), 150 * (i + 1));
            });
            
            btnElements.forEach((el, i) => {
                setTimeout(() => el.classList.add('show'), 200 * (i + 1));
            });
        }, 50);
    }

    // Initialize
    initObserver();
    
    // Animate first section immediately
    if (sections.length > 0) {
        resetAndAnimateSection(sections[0]);
    }
});

/* -----------------------------------------------Typing Animations -------------------------------- */

document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.querySelector('.text-content');
    const cursorElement = document.querySelector('.cursor');
    const jobTitles = [
        "Full Stack Developer",
        "Web Designer",
        "Proficient Programmer"
    ];
    
    let currentIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let typingSpeed = 150;
    let pauseBetween = 2000;
    
    function type() {
        const fullText = jobTitles[currentIndex];
        
        if (isDeleting) {
            // Delete text
            currentText = fullText.substring(0, currentText.length - 1);
        } else {
            // Write text
            currentText = fullText.substring(0, currentText.length + 1);
        }
        
        textElement.textContent = currentText;
        
        let typeSpeed = typingSpeed;
        
        if (isDeleting) {
            typeSpeed /= 2; // Faster deletion
        }
        
        // When text is complete
        if (!isDeleting && currentText === fullText) {
            typeSpeed = pauseBetween; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % jobTitles.length; // Loop through titles
            typeSpeed = 500; // Brief pause before typing next
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);
    
    // Pause animation on hover
    textElement.parentElement.addEventListener('mouseenter', () => {
        cursorElement.style.animation = 'none';
    });
    
    textElement.parentElement.addEventListener('mouseleave', () => {
        cursorElement.style.animation = 'blink 0.7s infinite';
    });
});