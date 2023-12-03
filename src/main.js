import { createApp, markRaw } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'

import './axios'
import './css/main.css'
import App from './App.vue'
import router from './router'
// import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from '@/stores/style.js'
import { darkModeKey, styleKey } from '@/config.js'

/* Init Pinia */
const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

// Currency formatter

const i18n = createI18n({
    legacy: false,
    locale: 'id-ID',
    numberFormats: {
        'id-ID': {
            currency: {
                style: 'currency',
                currency: 'IDR',
            },
        },
    },
})

/* Create Vue app */
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')

/* Init Pinia stores */
// const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia)

/* Fetch sample data */
// mainStore.fetch("clients");
// mainStore.fetch("history");

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? 'basic')

/* Dark mode */
if (
    (!localStorage[darkModeKey] && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
    localStorage[darkModeKey] === '1'
) {
    styleStore.setDarkMode(true)
}

/* Default title tag */
const defaultDocumentTitle = 'Admin One Vue 3 Tailwind'

/* Set document title from route meta */
router.afterEach((to) => {
    document.title = to.meta?.title ? `${to.meta.title} — ${defaultDocumentTitle}` : defaultDocumentTitle
})
