/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-green': '#064e3b',
                'primary-green': '#16a34a',
                'light-bg': '#f0fdf4',
                'text-body': '#374151',
            },
            fontFamily: {
                heading: ['Poppins', 'sans-serif'],
                body: ['Nunito Sans', 'sans-serif'],
            }
        },
    },
    plugins: [],
}