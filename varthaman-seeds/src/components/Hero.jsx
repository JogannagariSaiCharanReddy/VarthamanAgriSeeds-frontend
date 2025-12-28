const Hero = () => {
    return (
        <section
            className="text-white py-24 bg-cover bg-center relative"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1887&auto=format&fit=crop')`
            }}
        >
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-5xl font-bold mb-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Quality Seeds for a Bountiful Harvest
                </h2>
                <p className="text-xl mb-8 fade-in-up" style={{ animationDelay: '0.4s' }}>
                    Pioneering in high-yielding, resilient crop varieties for the modern farmer.
                </p>
                <a
                    href="#products"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 inline-block fade-in-up"
                    style={{ animationDelay: '0.6s' }}
                >
                    Explore Our Products
                </a>
            </div>
        </section>
    );
};

export default Hero;