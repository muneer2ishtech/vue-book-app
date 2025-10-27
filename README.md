# vue-book-app
Books managing UI application using Vue.js

1. Run `npm install` then `npm run dev`.
1. Configure `VITE_API_BASE` in `.env` if needed
    1. Defaults to http://localhost:8080.

vue-book-app/
├── .env
├── .env.development
├── .gitignore
├── LICENSE
├── README.md
├── favicon.ico
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── components
│   │   ├── Layout
│   │   │   ├── AppFooter.vue
│   │   │   ├── AppHeader.vue
│   │   │   └── AppNav.vue
│   │   └── common
│   │       └── ConfirmDialog.vue
│   ├── i18n
│   │   ├── en.json
│   │   └── fi.json
│   ├── main.ts
│   ├── plugins
│   │   └── vuetify.ts
│   ├── router
│   │   └── index.ts
│   ├── services
│   │   ├── auth.service.ts
│   │   └── book.service.ts
│   ├── store
│   │   └── index.ts
│   ├── stores
│   └── views
│       ├── Book
│       │   ├── BookForm.vue
│       │   ├── BookView.vue
│       │   └── BooksList.vue
│       ├── Dashboard.vue
│       └── SignIn.vue
├── tsconfig.json
├── vite-env.d.ts
└── vite.config.ts
