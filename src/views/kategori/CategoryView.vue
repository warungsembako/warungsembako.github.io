<script setup>
import { onMounted } from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import Table from '@/components/TableData.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

const thead = ['Kategori']

const linkAdd = 'tambah-data-category'
const linkEdit = 'edit-data-category'
const linkDetail = 'detail-data-category'

const columns = [
    {
        type: 'attributes',
        label: 'Kategori',
        keyItems: (obj) => obj.category,
    },
]

const confirmDelete = (id) => {
    categoryStore.handleDeleteData(id)
}

onMounted(async () => {
    await categoryStore.getCategory()
})

const filterTerbaru = () => {
    categoryStore.setFilter('terbaru')
    // Panggil action lainnya jika diperlukan
}

const filterTerlama = () => {
    categoryStore.setFilter('terlama')
    // Panggil action lainnya jika diperlukan
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
                    :items="categoryStore.categories"
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
