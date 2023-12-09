<script setup>
import { onMounted } from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import Table from '@/components/TableData.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useProductStore } from '@/stores/product'
import { useCategoryStore } from '@/stores/category'
import { formatNumberToCurrency } from 'rupiah-currency-formatter'

const productStore = useProductStore()
const categoryStore = useCategoryStore()

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
        type: 'attributes',
        label: 'Stok',
        keyItems: (obj) => obj.qty,
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
    await categoryStore.getCategory()
})

function setFilter(e) {
    productStore.setFilterCategory('category', e.target.value)
}
</script>

<template>
    <LayoutAuthenticated>
        <SectionMain>
            <CardBox>
                <div class="filter-buttons">
                    <select type="text" class="text-black rounded-md mb-3" @change="setFilter">
                        <option value="default">-</option>
                        <option v-for="item in categoryStore.categories" :key="item.id" :value="item.id">
                            {{ item.attributes.category }}
                        </option>
                    </select>
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
