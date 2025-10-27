import type { Config } from 'tailwindcss'


export default {
content: ['./index.html', './src/**/*.{ts,tsx}'],
theme: {
extend: {
colors: {
primary: {
50: '#eef7ff', 100: '#d9ecff', 200: '#bfe0ff', 300: '#96cdff',
400: '#66b2ff', 500: '#3b91f7', 600: '#2c74d4', 700: '#235dad',
800: '#1f4e8e', 900: '#1e4476',
},
},
boxShadow: {
focus: '0 0 0 3px rgba(59,145,247,0.45)'
}
},
},
plugins: [],
} satisfies Config