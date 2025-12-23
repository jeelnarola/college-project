import daisyui from 'daisyui';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        daisyui,
        plugin(function ({ addVariant }) {
            addVariant('is-drawer-open', ['.drawer-toggle:checked ~ .drawer-side &', '.drawer-toggle:checked ~ &']);
            addVariant('is-drawer-close', ['.drawer-toggle:not(:checked) ~ .drawer-side &', '.drawer-toggle:not(:checked) ~ &']);
        }),
    ],
}
