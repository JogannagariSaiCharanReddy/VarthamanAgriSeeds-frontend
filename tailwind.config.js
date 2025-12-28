/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['Poppins', 'sans-serif'],
                body: ['Nunito Sans', 'sans-serif'],
            },
            colors: {
                'dark-green': '#064e3b',
                'primary-green': '#16a34a',
                'light-bg': '#f0fdf4',
                'text-body': '#374151',
            },
        },
    },
    plugins: [],
}
