import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({site:'https://samrushgroupbuy.com',output:'static',trailingSlash:'always',integrations:[react()],vite:{plugins:[tailwindcss()]}});
