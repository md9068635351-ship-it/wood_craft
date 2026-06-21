var config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                walnut: "var(--color-walnut)",
                ink: "var(--color-ink)",
                sandalwood: "var(--color-sandalwood)",
                paper: "var(--color-paper)",
                "paper-warm": "var(--color-paper-warm)",
                moss: "var(--color-moss)",
                rust: "var(--color-rust)",
                gold: "var(--color-gold)",
            },
            fontFamily: {
                display: ["var(--font-display)", "serif"],
                body: ["var(--font-body)", "sans-serif"],
            },
            borderRadius: {
                carve: "0.25rem 1rem 0.25rem 1rem",
            },
        },
    },
    plugins: [],
};
export default config;
