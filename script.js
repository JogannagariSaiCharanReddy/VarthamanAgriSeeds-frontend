import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import data from './data.json';

gsap.registerPlugin(ScrollTrigger);

let globalData = data;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Loader
    const loader = document.getElementById('loader');
    const mainBody = document.getElementById('main-body');

    // Simulate a minimum load time for the premium feel
    setTimeout(() => {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loader.style.display = 'none';
                mainBody.classList.remove('opacity-0');
                mainBody.classList.add('transition-opacity', 'duration-700', 'opacity-100');
                initApp();
            }
        });
    }, 800);
});

function initApp() {
    initLenis();
    renderContent();
    initAnimations();
    initMobileMenu();
}

function initLenis() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

function renderContent() {
    if (globalData) {
        updateCompanyProfile();
        updateCropCategories();
    }
}

function initAnimations() {
    // Hero Animations
    const heroTimeline = gsap.timeline();

    heroTimeline
        .to('.hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 })
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.7)' }, '-=0.6');

    // Header Scroll Effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-md', 'py-2');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-md', 'py-2');
            header.classList.add('py-4');
        }
    });

    // About Section Parallax/Reveal
    gsap.from('.about-card', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Section Titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
}

function updateCompanyProfile() {
    const profile = globalData.company_profile;
    if (!profile) return;

    const contactInfo = profile.contact_info;

    document.getElementById('company-name-header').textContent = contactInfo.company_name;
    document.getElementById('company-name-footer').textContent = contactInfo.company_name;
    document.getElementById('about-us-content').textContent = profile.about_us;
    document.getElementById('company-address').textContent = contactInfo.address;

    const emailLink = document.getElementById('company-email');
    emailLink.textContent = contactInfo.email;
    emailLink.href = `mailto:${contactInfo.email}`;

    document.getElementById('company-phone').textContent = contactInfo.customer_care_cell;
}

function updateCropCategories() {
    const cropData = globalData.crop_data;
    if (!cropData) return;

    const cropCategories = Object.keys(cropData);
    const cropTabsContainer = document.getElementById('crop-tabs-container');
    cropTabsContainer.innerHTML = '';

    cropCategories.forEach((category, index) => {
        const tab = document.createElement('button');
        tab.textContent = category;
        // Updated base classes for a cleaner, premium look
        tab.classList.add('px-6', 'py-2', 'm-1', 'rounded-full', 'font-semibold', 'text-gray-600', 'transition-all', 'duration-300', 'focus:outline-none', 'hover:bg-gray-100');

        if (index === 0) {
            tab.classList.add('active-tab-modern', 'bg-primary-green', 'text-white', 'shadow-md', 'transform', 'scale-105');
        }

        tab.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('#crop-tabs-container button').forEach(t => {
                t.classList.remove('active-tab-modern', 'bg-primary-green', 'text-white', 'shadow-md', 'transform', 'scale-105');
                t.classList.add('text-gray-600', 'hover:bg-gray-100');
            });
            tab.classList.remove('text-gray-600', 'hover:bg-gray-100');
            tab.classList.add('active-tab-modern', 'bg-primary-green', 'text-white', 'shadow-md', 'transform', 'scale-105');

            displayCropsForCategory(category);

            // Smoothly scroll the products section to the middle of the screen
            setTimeout(() => {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        });
        cropTabsContainer.appendChild(tab);
    });

    if (cropCategories.length > 0) {
        displayCropsForCategory(cropCategories[0]);
    }

    // Initialize scroll controls after tabs are rendered
    setTimeout(initCategoryScroll, 0);
}

function initCategoryScroll() {
    const container = document.getElementById('crop-tabs-container');
    const leftBtn = document.getElementById('scroll-left');
    const rightBtn = document.getElementById('scroll-right');
    const leftGradient = document.getElementById('scroll-gradient-left');
    const rightGradient = document.getElementById('scroll-gradient-right');

    if (!container || !leftBtn || !rightBtn) return;

    const checkScroll = () => {
        // Left Arrow & Gradient
        if (container.scrollLeft > 20) {
            leftBtn.classList.remove('opacity-0', 'pointer-events-none');
            leftGradient.classList.remove('opacity-0');
        } else {
            leftBtn.classList.add('opacity-0', 'pointer-events-none');
            leftGradient.classList.add('opacity-0');
        }

        // Right Arrow & Gradient
        // Use a small tolerance (1px) for float calculation differences
        if (Math.ceil(container.scrollLeft) < (container.scrollWidth - container.clientWidth - 1)) {
            rightBtn.classList.remove('opacity-0', 'pointer-events-none');
            rightGradient.classList.remove('opacity-0');
        } else {
            rightBtn.classList.add('opacity-0', 'pointer-events-none');
            rightGradient.classList.add('opacity-0');
        }
    };

    // Remove existing listeners to prevent duplicates if re-initialized
    const newLeftBtn = leftBtn.cloneNode(true);
    const newRightBtn = rightBtn.cloneNode(true);
    leftBtn.parentNode.replaceChild(newLeftBtn, leftBtn);
    rightBtn.parentNode.replaceChild(newRightBtn, rightBtn);

    newLeftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -200, behavior: 'smooth' });
    });

    newRightBtn.addEventListener('click', () => {
        container.scrollBy({ left: 200, behavior: 'smooth' });
    });

    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    // Initial check
    checkScroll();
}

function displayCropsForCategory(categoryName) {
    const cropCardsContainer = document.getElementById('crop-cards-container');

    // Fade out existing content
    gsap.to(cropCardsContainer, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
            const crops = globalData.crop_data[categoryName];
            cropCardsContainer.innerHTML = '';

            if (!crops || crops.length === 0) {
                cropCardsContainer.innerHTML = '<p class="text-center col-span-full text-gray-500">No products found in this category.</p>';
            } else {
                crops.forEach((crop, index) => {
                    const card = document.createElement('div');
                    // Added cursor-pointer to indicate it's clickable
                    card.classList.add('crop-card', 'bg-white', 'rounded-xl', 'shadow-lg', 'overflow-hidden', 'transform', 'transition-all', 'duration-300', 'hover:shadow-2xl', 'group', 'cursor-pointer');

                    let detailsHtml = '<ul class="list-disc list-inside space-y-1 text-sm text-gray-600">';
                    if (crop.details && Array.isArray(crop.details)) {
                        crop.details.slice(0, 4).forEach(detail => { // Limit to 4 details for cleaner look
                            detailsHtml += `<li>${detail}</li>`;
                        });
                    }
                    detailsHtml += '</ul>';

                    card.innerHTML = `
                        <div class="relative overflow-hidden h-64">
                            <img src="${crop.image_url}" alt="${crop.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onerror="this.onerror=null;this.src='https://placehold.co/600x400/e2e8f0/1e293b?text=Image+Not+Found';">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span class="text-white font-bold tracking-wider">VIEW DETAILS</span>
                            </div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-3 text-dark-green group-hover:text-primary-green transition-colors">${crop.name}</h3>
                            <div class="mb-4">
                                ${detailsHtml}
                            </div>
                        </div>
                    `;

                    // Add click listener to center the card on screen
                    card.addEventListener('click', () => {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    });

                    cropCardsContainer.appendChild(card);
                });
            }

            // Fade in new content with stagger
            gsap.to(cropCardsContainer, { opacity: 1, duration: 0.2 });
            gsap.fromTo('.crop-card',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
            );
        }
    });
}

function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (!mobileMenu.classList.contains('hidden')) {
                gsap.from('#mobile-menu a', {
                    x: -20,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.1
                });
            }
        });
    }
}
