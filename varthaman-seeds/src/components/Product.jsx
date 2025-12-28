import { useState } from 'react';
import { COMPANY_DATA } from '../data';

const Products = () => {
    const categories = Object.keys(COMPANY_DATA.crop_data);
    const [activeTab, setActiveTab] = useState(categories[0]);

    const activeCrops = COMPANY_DATA.crop_data[activeTab] || [];

    return (
        <section id="products" className="scroll-mt-24">
            <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Our Products</h2>

            {/* Tabs */}
            <div className="flex justify-center flex-wrap border-b-2 border-gray-200">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`px-4 py-3 m-2 font-semibold transition duration-300 focus:outline-none hover:text-green-600 
              ${activeTab === category
                                ? 'border-b-4 border-primary-green text-primary-green font-bold'
                                : 'text-gray-600'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {activeCrops.length > 0 ? (
                    activeCrops.map((crop, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300 border-2 border-transparent hover:border-green-500"
                        >
                            <img
                                src={crop.image_url}
                                alt={crop.name}
                                className="w-full h-56 object-cover"
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found' }}
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-3 text-green-700">{crop.name}</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    {crop.details.map((detail, idx) => (
                                        <li key={idx}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full">No products found in this category.</p>
                )}
            </div>
        </section>
    );
};

export default Products;