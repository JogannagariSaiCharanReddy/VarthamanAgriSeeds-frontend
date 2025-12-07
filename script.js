let globalData = null;

document.addEventListener('DOMContentLoaded', () => {
    fetchData().then(() => {
        if (globalData) {
            // updateLogo(); // Logo logic is handled below independently of data
            updateCompanyProfile();
            updateCropCategories();
        }
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const logoElement = document.getElementById('company-logo');
    if (logoElement) {
        // We assume the logo is at images/logo.png as per our migration plan
        logoElement.src = 'images/logo.png';
        logoElement.onerror = function () {
            this.src = 'https://placehold.co/40x40/cccccc/ffffff?text=L';
        };
    }
});

/**
 * Fetches the data and stores it globally.
 * In this static version, we use a global variable STATIC_DATA loaded from data.js
 * to avoid CORS issues with file:// protocol.
 */
function fetchData() {
    return new Promise((resolve, reject) => {
        if (typeof STATIC_DATA !== 'undefined') {
            globalData = STATIC_DATA;
            resolve(globalData);
        } else {
            // Fallback for server environments if data.js didn't load or we want to try fetching
            fetch('data.json')
                .then(response => {
                    if (!response.ok) throw new Error('Failed to load data.json');
                    return response.json();
                })
                .then(data => {
                    globalData = data;
                    resolve(globalData);
                })
                .catch(error => {
                    console.error('Error loading data:', error);
                    document.getElementById('about-us-content').textContent = 'Error loading site data. Please try again later.';
                    reject(error);
                });
        }
    });
}

/**
 * Populates the company profile and contact information.
 */
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

/**
 * Populates the crop categories tabs.
 */
function updateCropCategories() {
    const cropData = globalData.crop_data;
    if (!cropData) return;

    const cropCategories = Object.keys(cropData);
    const cropTabsContainer = document.getElementById('crop-tabs-container');
    cropTabsContainer.innerHTML = ''; // Clear existing

    cropCategories.forEach((category, index) => {
        const tab = document.createElement('button');
        tab.textContent = category;
        tab.classList.add('px-4', 'py-3', 'm-2', 'font-semibold', 'text-gray-600', 'transition', 'duration-300', 'focus:outline-none', 'hover:text-green-600');

        if (index === 0) {
            tab.classList.add('active-tab');
        }

        tab.addEventListener('click', () => {
            displayCropsForCategory(category);

            // Update active tab style
            document.querySelectorAll('#crop-tabs-container button').forEach(t => {
                t.classList.remove('active-tab');
            });
            tab.classList.add('active-tab');

            // Smoothly scroll to the products section after a short delay
            setTimeout(() => {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
        cropTabsContainer.appendChild(tab);
    });

    if (cropCategories.length > 0) {
        displayCropsForCategory(cropCategories[0]);
    }
}

/**
 * Displays all crop products for a given category name.
 * @param {string} categoryName - The name of the category to fetch products for.
 */
function displayCropsForCategory(categoryName) {
    const cropCardsContainer = document.getElementById('crop-cards-container');
    cropCardsContainer.innerHTML = '<p class="text-center col-span-full">Loading products...</p>';

    const crops = globalData.crop_data[categoryName];
    cropCardsContainer.innerHTML = '';

    if (!crops || crops.length === 0) {
        cropCardsContainer.innerHTML = '<p class="text-center col-span-full">No products found in this category.</p>';
        return;
    }

    crops.forEach(crop => {
        const card = document.createElement('div');
        card.classList.add('bg-white', 'rounded-lg', 'shadow-lg', 'overflow-hidden', 'transform', 'hover:-translate-y-2', 'transition', 'duration-300', 'border-2', 'border-transparent', 'hover:border-green-500');

        let detailsHtml = '<ul class="list-disc list-inside space-y-2">';
        if (crop.details && Array.isArray(crop.details)) {
            crop.details.forEach(detail => {
                detailsHtml += `<li>${detail}</li>`;
            });
        }
        detailsHtml += '</ul>';

        // Use the image_url from data.json which we updated to be relative
        card.innerHTML = `
            <img src="${crop.image_url}" alt="${crop.name}" class="w-full h-56 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found';">
            <div class="p-6">
                <h3 class="text-2xl font-bold mb-3 text-green-700">${crop.name}</h3>
                <div class="text-gray-600">
                    ${detailsHtml}
                </div>
            </div>
        `;
        cropCardsContainer.appendChild(card);
    });
}
