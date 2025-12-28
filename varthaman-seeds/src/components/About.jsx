import { COMPANY_DATA } from '../data';

const About = () => {
    return (
        <section id="about" className="mb-20 scroll-mt-24">
            <div
                className="relative rounded-lg shadow-lg overflow-hidden bg-cover bg-center min-h-[450px] flex items-center justify-center text-center p-8"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1770&auto=format&fit=crop')`
                }}
            >
                <div className="max-w-4xl">
                    <h2 className="text-4xl font-bold mb-6 text-white">About {COMPANY_DATA.company_profile.contact_info.company_name}</h2>
                    <p className="text-lg leading-relaxed text-gray-200">
                        {COMPANY_DATA.company_profile.about_us}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;