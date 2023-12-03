import { createRouter, createWebHistory } from 'vue-router'
// import Style from "@/views/StyleView.vue";
import Home from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
    {
        meta: {
            title: 'Dashboard',
            requiredAuth: true,
        },
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        meta: {
            title: 'Master Satuan',
            requiredAuth: true,
        },
        path: '/data-satuan',
        name: 'data-satuan',
        component: () => import('@/views/unit/UnitView.vue'),
    },
    {
        meta: {
            title: 'Tambah Data Satuan',
            requiredAuth: true,
        },
        path: '/data-satuan/tambah',
        name: 'tambah-data-satuan',
        component: () => import('@/views/unit/AddUnitView.vue'),
    },
    {
        meta: {
            title: 'Edit Data Satuan',
            requiredAuth: true,
        },
        path: '/edit-data-satuan/:id/edit',
        name: 'edit-data-satuan',
        component: () => import('@/views/unit/EditUnitView.vue'),
    },
    {
        meta: {
            title: 'Master Kategori',
            requiredAuth: true,
        },
        path: '/data-kategori',
        name: 'data-kategori',
        component: () => import('@/views/kategori/CategoryView.vue'),
    },
    {
        meta: {
            title: 'Tambah Data Kategori',
            requiredAuth: true,
        },
        path: '/tambah-data-category',
        name: 'tambah-data-category',
        component: () => import('@/views/kategori/AddCategoryView.vue'),
    },
    {
        meta: {
            title: 'Edit Data Kategori',
            requiredAuth: true,
        },
        path: '/edit-data-category/:id/edit',
        name: 'edit-data-category',
        component: () => import('@/views/kategori/EditCategoryView.vue'),
    },
    {
        meta: {
            title: 'Detail Data Kategori',
            requiredAuth: true,
        },
        path: '/detail-data-category/:id/detail',
        name: 'detail-data-category',
        component: () => import('@/views/kategori/DetailCategoryView.vue'),
    },
    {
        meta: {
            title: 'Tambah Data Kategori',
            requiredAuth: true,
        },
        path: '/data-kategori/tambah',
        name: 'tambah-data-kategori',
        component: () => import('@/views/kategori/AddCategoryView.vue'),
    },
    {
        meta: {
            title: 'Edit Data Kategori',
            requiredAuth: true,
        },
        path: '/edit-data-kategori/:id/edit',
        name: 'edit-data-kategori',
        component: () => import('@/views/kategori/EditCategoryView.vue'),
    },
    {
        meta: {
            title: 'Data Produk',
            requiredAuth: true,
        },
        path: '/data-produk',
        name: 'data-produk',
        component: () => import('@/views/product/ProductView.vue'),
    },
    {
        meta: {
            title: 'Tambah Data Produk',
            requiredAuth: true,
        },
        path: '/tambah-data-produk',
        name: 'tambah-data-produk',
        component: () => import('@/views/product/AddProductView.vue'),
    },
    {
        meta: {
            title: 'Edit Data Produk',
            requiredAuth: true,
        },
        path: '/edit-data-produk/:id/edit',
        name: 'edit-data-produk',
        component: () => import('@/views/product/EditProductView.vue'),
    },
    {
        meta: {
            title: 'Detail Data Produk',
            requiredAuth: true,
        },
        path: '/detail-data-produk/:id/detail',
        name: 'detail-data-produk',
        component: () => import('@/views/product/DetailProductView.vue'),
    },
    {
        meta: {
            title: 'Tambah Transaksi',
            requiredAuth: true,
        },
        path: '/data-transaksi',
        name: 'data-transaksi',
        component: () => import('@/views/transaction/AddTransactionView.vue'),
    },
    {
        meta: {
            title: 'Data Stok',
            requiredAuth: true,
        },
        path: '/data-stok',
        name: 'data-stok',
        component: () => import('@/views/stok/StokView.vue'),
    },
    {
        meta: {
            title: 'Riwayat Transaksi',
            requiredAuth: true,
        },
        path: '/data-riwayat-transaksi',
        name: 'data-riwayat-transaksi',
        component: () => import('@/views/transaction/HistoryTransactionView.vue'),
    },
    {
        meta: {
            title: 'Cetak Riwayat Transaksi',
            requiredAuth: true,
        },
        path: '/data-riwayat-transaksi-cetak',
        name: 'data-riwayat-transaksi-cetak',
        component: () => import('@/views/transaction/CetakHistoryTransactionView.vue'),
    },
    {
        meta: {
            title: 'Login',
        },
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
    },
    {
        meta: {
            title: 'Error',
            requiredAuth: true,
        },
        path: '/error',
        name: 'error',
        component: () => import('@/views/ErrorView.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 }
    },
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    if (to.meta && to.meta.requiredAuth) {
        try {
            await authStore.getUser()
            if (!authStore.user) {
                next({ name: 'login' })
            } else {
                next()
            }
        } catch (error) {
            if (error) {
                next({
                    name: 'login',
                })
            }
        }
    } else {
        next()
    }
})

export default router
