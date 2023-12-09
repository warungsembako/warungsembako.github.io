<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { mdiArrowLeftThinCircleOutline } from '@mdi/js'
import { useProductStore } from '@/stores/product'
import { formatNumberToCurrency } from 'rupiah-currency-formatter'

const route = useRoute()
const productStore = useProductStore()

const data = reactive({
    category: '',
    name: '',
    desc: '',
    price_buy: '',
    price_sell: '',
    qty: '',
    unit: '',
})

const id = route.params.id

onMounted(async () => {
    await productStore.getProductById(id)

    data.category = productStore.product.relationships.category.attributes.category
    data.name = productStore.product.attributes.name
    data.desc = productStore.product.attributes.desc
    data.price_buy = formatNumberToCurrency(Math.ceil(productStore.product.attributes.price_buy))
    data.price_sell = formatNumberToCurrency(Math.ceil(productStore.product.attributes.price_sell))
    data.qty = productStore.product.attributes.qty
    data.unit = productStore.product.relationships.unit.attributes.desc
})
</script>

<template>
    <LayoutAuthenticated>
        <SectionMain>
            <CardBox>
                <RouterLink :to="{ name: 'data-produk' }" class="hover:text-indigo-600">
                    <BaseIcon :path="mdiArrowLeftThinCircleOutline" size="34" w="" h="h-16" />
                </RouterLink>
                <h1 class="text-center text-2xl mb-4">Detail Data Produk</h1>
                <div class="mt-4">
                    <h2 class="text-gray-500 mt-3">Kategori</h2>
                    <p class="mt-2 text-lg">{{ data.category }}</p>
                    <h2 class="text-gray-500 mt-3">Nama</h2>
                    <p class="mt-2 text-lg">{{ data.name }}</p>
                    <h2 class="text-gray-500 mt-3">Deskripsi</h2>
                    <p class="mt-2 text-lg">{{ data.desc ? data.desc : '-' }}</p>
                    <h2 class="text-gray-500 mt-3">Harga Beli</h2>
                    <p class="mt-2 text-lg">{{ data.price_buy }}</p>
                    <h2 class="text-gray-500 mt-3">Harga Jual</h2>
                    <p class="mt-2 text-lg">{{ data.price_sell }}</p>
                    <h2 class="text-gray-500 mt-3">Jumlah</h2>
                    <p class="mt-2 text-lg">{{ data.qty }}</p>
                    <h2 class="text-gray-500 mt-3">Satuan</h2>
                    <p class="mt-2 text-lg">{{ data.unit }}</p>
                </div>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
