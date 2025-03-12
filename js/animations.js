document.addEventListener('DOMContentLoaded', function() {
    // Animation controller for better performance
    const animateElements = document.querySelectorAll('[data-animate]');
    
    // Optimize button animations
    const resourceButtons = document.querySelectorAll('.resource-btn[data-animate]');
    
    // Performance-optimized Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.05
    };
    
    // Handle element visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.dataset.animate;
                
                // Special fast timing for resource buttons
                if (entry.target.classList.contains('resource-btn')) {
                    // Get button's position in its group to create a slight stagger effect
                    const delay = Math.min(parseInt(entry.target.dataset.delay || 0), 3) * 20;
                    
                    setTimeout(() => {
                        entry.target.classList.add('animated', animationType);
                        entry.target.style.opacity = '1';
                    }, delay);
                } else {
                    // Regular elements with standard delay
                    const delay = entry.target.dataset.delay || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('animated', animationType);
                        entry.target.style.opacity = '1';
                    }, delay * 50);
                }
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Start observing elements only on larger screens
    if (window.innerWidth >= 768) {
        // Group resource buttons by parent and optimize animations
        const resourceGroups = document.querySelectorAll('.resources-links, .resource-group');
        resourceGroups.forEach(group => {
            const buttons = group.querySelectorAll('.resource-btn');
            buttons.forEach((btn, index) => {
                btn.style.opacity = '0';
                btn.dataset.delay = index; // Sequential order within group
                observer.observe(btn);
            });
        });
        
        // Animate other elements
        animateElements.forEach(element => {
            if (!element.classList.contains('resource-btn')) {
                element.style.opacity = '0';
                observer.observe(element);
            }
        });
    } else {
        // Make all elements visible on mobile without animation
        animateElements.forEach(element => {
            element.style.opacity = '1';
        });
        resourceButtons.forEach(button => {
            button.style.opacity = '1';
        });
    }
});