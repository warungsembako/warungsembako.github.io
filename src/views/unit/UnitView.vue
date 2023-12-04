<script setup>
import { onMounted } from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import TableSatuan from '@/components/TableData.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useSatuanStore } from '@/stores/satuan'
import BaseButton from '@/components/BaseButton.vue'

const satuanStore = useSatuanStore()

const thead = ['Satuan', 'Keterangan']

const linkAdd = 'tambah-data-satuan'
const linkEdit = 'edit-data-satuan'

const columns = [
    {
        type: 'attributes',
        label: 'Satuan',
        keyItems: (obj) => obj.unit,
    },
    {
        type: 'attributes',
        label: 'Keterangan',
        keyItems: (obj) => obj.desc,
    },
]

const confirmDelete = (id) => {
    satuanStore.handleDeleteData(id)
}

onMounted(async () => {
    await satuanStore.getSatuan()
})
const filterTerbaru = () => {
    satuanStore.setFilter('terbaru')
    // Panggil action lainnya jika diperlukan
}

const filterTerlama = () => {
    satuanStore.setFilter('terlama')
    // Panggil action lainnya jika diperlukan
}
</script>

<template>
    <LayoutAuthenticated>
        <SectionMain>
            <!-- Tombol filter -->

            <CardBox>
                <div class="filter-buttons">
                    <BaseButton color="success" label="Data Terbaru" class="mb-2" @click="filterTerbaru"></BaseButton>
                    <BaseButton color="danger" label="Data Terlama" class="mb-2" @click="filterTerlama"></BaseButton>
                </div>
                <TableSatuan
                    :items="satuanStore.units"
                    :thead="thead"
                    :link="linkAdd"
                    :link-edit="linkEdit"
                    :columns="columns"
                    :is-detail="false"
                    @confirm="confirmDelete"
                />
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
