/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FORMSPREE_ID?: string
    readonly VITE_SITE_URL?: string
    readonly VITE_NOINDEX?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
