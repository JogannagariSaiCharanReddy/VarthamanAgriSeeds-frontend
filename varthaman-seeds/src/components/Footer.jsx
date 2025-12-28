import { COMPANY_DATA } from '../data';

const Footer = () => {
    const { contact_info } = COMPANY_DATA.company_profile;

    return (
        <footer id="contact" className="bg-dark-green text-white mt-20">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold mb-4">{contact_info.company_name}</h3>
                        <p className="text-gray-300">{contact_info.address}</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <p className="text-gray-300 mb-2">
                            <strong>Email:</strong> <a href={`mailto:${contact_info.email}`} className="hover:underline">{contact_info.email}</a>
                        </p>
                        <p className="text-gray-300">
                            <strong>Customer Care:</strong> {contact_info.customer_care_cell}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            {/* Social Icons (SVG) */}
                            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.295 1.616 4.212 3.766 4.652-.69.188-1.432.233-2.18.084.608 1.935 2.372 3.337 4.464 3.375-1.749 1.373-3.952 2.186-6.342 2.186-.41 0-.814-.024-1.21-.072 2.27 1.456 4.973 2.302 7.873 2.302 9.478 0 14.656-7.855 14.656-14.655 0-.224-.005-.447-.015-.669.998-.724 1.863-1.623 2.56-2.659z" /></svg>
                            </a>
                        </div>
                    </div>

                </div>
                <div className="mt-8 border-t border-gray-600 pt-6 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} {contact_info.company_name}. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;