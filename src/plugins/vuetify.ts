// src/plugins/vuetify.ts
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { loadFonts } from './webfontloader'

// Load Google Fonts
loadFonts()

export default createVuetify({
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#1f2937',
                    secondary: '#374151',
                    accent: '#10b981',
                    background: '#f5f7fa',
                    surface: '#ffffff',
                    error: '#b91c1c',
                    info: '#3b82f6',
                    success: '#10b981',
                    warning: '#f59e0b',
                },
            },
            dark: {
                dark: true,
                colors: {
                    primary: '#f5f7fa',
                    secondary: '#d1d5db',
                    accent: '#10b981',
                    background: '#1f2937',
                    surface: '#374151',
                    error: '#ef4444',
                    info: '#3b82f6',
                    success: '#10b981',
                    warning: '#f59e0b',
                },
            },
        },
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
    },
})
