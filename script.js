document.addEventListener('DOMContentLoaded', () => {
    fetchCompanyProfile();
    fetchLogo(); // Fetch the logo on page load
    fetchCropData();

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});

/**
 * Fetches the company logo from the API and updates the header.
 */
function fetchLogo() {
    fetch(`${API_BASE_URL}/api/logo`)
        .then(response => {
            if (!response.ok) throw new Error('Logo not found');
            return response.json(); // Assuming the API returns JSON like { "logo_url": "..." }
        })
        .then(data => {
            const logoElement = document.getElementById('company-logo');
            if (logoElement && data.logo_url) {
                logoElement.src = data.logo_url;
            }
        })
        .catch(error => {
            console.error('Error fetching company logo:', error);
            // The placeholder will be used if the logo fails to load.
        });
}

/**
 * Fetches the company's profile and contact information from the API
 * and populates the relevant HTML elements.
 */
function fetchCompanyProfile() {
    fetch(`${API_BASE_URL}/api/company-profile`)
        .then(response => {
            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            document.getElementById('company-name-header').textContent = data.contact_info.company_name;
            document.getElementById('company-name-footer').textContent = data.contact_info.company_name;
            document.getElementById('about-us-content').textContent = data.about_us;
            document.getElementById('company-address').textContent = data.contact_info.address;
            const emailLink = document.getElementById('company-email');
            emailLink.textContent = data.contact_info.email;
            emailLink.href = `mailto:${data.contact_info.email}`;
            document.getElementById('company-phone').textContent = data.contact_info.customer_care_cell;
        })
        .catch(error => console.error('Error fetching company profile:', error));
}

/**
 * Fetches the list of crop categories to build the navigation tabs.
 */
function fetchCropData() {
    fetch(`${API_BASE_URL}/api/categories`)
        .then(response => {
            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
            return response.json();
        })
        .then(cropCategories => {
            const cropTabsContainer = document.getElementById('crop-tabs-container');

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

                    // --- NEW ---
                    // Smoothly scroll to the products section after a short delay
                    // to allow the content to start loading.
                    setTimeout(() => {
                        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                });
                cropTabsContainer.appendChild(tab);
            });

            if (cropCategories.length > 0) {
                displayCropsForCategory(cropCategories[0]);
            }
        })
        .catch(error => console.error('Error fetching crop data:', error));
}

/**
 * Fetches and displays all crop products for a given category name.
 * @param {string} categoryName - The name of the category to fetch products for.
 */
function displayCropsForCategory(categoryName) {
    const cropCardsContainer = document.getElementById('crop-cards-container');
    cropCardsContainer.innerHTML = '<p class="text-center col-span-full">Loading products...</p>';

    fetch(`${API_BASE_URL}/api/crops/${categoryName}`)
        .then(response => {
            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
            return response.json();
        })
        .then(crops => {
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
        })
        .catch(error => {
            console.error(`Error fetching crops for category '${categoryName}':`, error);
            cropCardsContainer.innerHTML = '<p class="text-center col-span-full text-red-500">Could not load products. Please try again later.</p>';
        });
}