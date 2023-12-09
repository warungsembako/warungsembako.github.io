<script setup>
import { onMounted } from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import Table from '@/components/TableData.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import BaseButton from '@/components/BaseButton.vue'
import { formatNumberToCurrency } from 'rupiah-currency-formatter'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()

const thead = ['Kategori', 'Nama', 'Deskripsi', 'Harga Jual', 'Satuan']

const linkAdd = 'tambah-data-produk'
const linkEdit = 'edit-data-produk'
const linkDetail = 'detail-data-produk'

const columns = [
    {
        type: 'relationships',
        label: 'Kategori',
        relationships: (obj) => obj.category,
        keyItems: (obj) => obj.attributes.category,
    },
    {
        type: 'attributes',
        label: 'Nama',
        keyItems: (obj) => obj.name,
    },
    {
        type: 'attributes',
        label: 'Deskripsi',
        keyItems: (obj) => obj.desc,
    },
    {
        type: 'attributes',
        label: 'Harga Jual',
        keyItems: (obj) => formatNumberToCurrency(Math.ceil(obj.price_sell)),
    },
    {
        type: 'relationships',
        label: 'Satuan',
        relationships: (obj) => obj.unit,
        keyItems: (obj) => obj.attributes.desc,
    },
]

const confirmDelete = (id) => {
    productStore.handleDeleteData(id)
}

onMounted(async () => {
    await productStore.getProducts()
})

const filterTerbaru = () => {
    productStore.setFilter('date', 'terbaru')
}

const filterTerlama = () => {
    productStore.setFilter('date', 'terlama')
}
</script>

<template>
    <LayoutAuthenticated>
        <SectionMain>
            <CardBox>
                <div class="filter-buttons">
                    <BaseButton color="success" label="Data Terbaru" class="mb-2" @click="filterTerbaru"></BaseButton>
                    <BaseButton color="danger" label="Data Terlama" class="mb-2" @click="filterTerlama"></BaseButton>
                </div>
                <Table
                    :items="productStore.products"
                    :link="linkAdd"
                    :link-edit="linkEdit"
                    :link-detail="linkDetail"
                    :thead="thead"
                    :columns="columns"
                    @confirm="confirmDelete"
                />
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
