<script setup>
import { onMounted, reactive } from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { mdiArrowLeftThinCircleOutline } from '@mdi/js'
import { useSatuanStore } from '@/stores/satuan'
import { useCategoryStore } from '@/stores/category'
import { useProductStore } from '@/stores/product'

const satuanStore = useSatuanStore()
const categoryStore = useCategoryStore()
const productStore = useProductStore()

const form = reactive({
    unit: '',
    category: '',
    name: '',
    price_buy: 0,
    price_sell: 0,
    qty: 0,
})

const handleReset = () => {
    form.unit = ''
    form.category = ''
    form.name = ''
    form.price_buy = 0
    form.price_sell = 0
    form.qty = 0
}

onMounted(async () => {
    satuanStore.getSatuan()
    categoryStore.getCategory()
})
</script>

<template>
    <LayoutAuthenticated>
        <SectionMain>
            <CardBox is-form @submit.prevent="productStore.handleAddData(form)">
                <RouterLink :to="{ name: 'data-produk' }" class="hover:text-indigo-600">
                    <BaseIcon :path="mdiArrowLeftThinCircleOutline" size="34" w="" h="h-16" />
                </RouterLink>
                <h1 class="text-center text-2xl mb-4">Tambah Data Produk</h1>
                <FormField label="Pilih Satuan">
                    <FormControl v-model="form.unit" type="select" :options="satuanStore.units" select-label="desc">
                        <div v-if="satuanStore.errors.unit_id">
                            <span class="text-red-400 text-sm p-2">{{ satuanStore.errors.unit_id[0] }}</span>
                        </div>
                    </FormControl>
                </FormField>
                <FormField label="Pilih Kategori">
                    <FormControl
                        v-model="form.category"
                        type="select"
                        :options="categoryStore.categories"
                        select-label="category"
                    >
                        <div v-if="categoryStore.errors.category_id">
                            <span class="text-red-400 text-sm p-2">{{ categoryStore.errors.category_id[0] }}</span>
                        </div>
                    </FormControl>
                </FormField>
                <FormField label="Nama">
                    <FormControl v-model="form.name" placeholder="Nama...">
                        <div v-if="productStore.errors.name">
                            <span class="text-red-400 text-sm p-2">{{ productStore.errors.name[0] }}</span>
                        </div>
                    </FormControl>
                </FormField>
                <FormField label="Deskripsi">
                    <FormControl v-model="form.desc" placeholder="Deskripsi..."></FormControl>
                </FormField>
                <FormField label="Harga Beli">
                    <FormControl v-model="form.price_buy" type="number" min="0">
                        <div v-if="productStore.errors.price_buy">
                            <span class="text-red-400 text-sm p-2">{{ productStore.errors.price_buy[0] }}</span>
                        </div>
                    </FormControl>
                </FormField>
                <FormField label="Harga Jual">
                    <FormControl v-model="form.price_sell" type="number" min="0">
                        <div v-if="productStore.errors.price_buy">
                            <span class="text-red-400 text-sm p-2">{{ productStore.errors.price_sell[0] }}</span>
                        </div>
                    </FormControl>
                </FormField>
                <FormField label="Jumlah">
                    <FormControl v-model="form.qty" type="number" min="0">
                        <div v-if="productStore.errors.price_buy">
                            <span class="text-red-400 text-sm p-2">{{ productStore.errors.qty[0] }}</span>
                        </div>
                    </FormControl>
                </FormField>
                <template #footer>
                    <BaseButtons>
                        <BaseButton type="submit" color="info" label="Submit" />
                        <BaseButton type="reset" color="danger" outline label="Reset" @click.prevent="handleReset" />
                    </BaseButtons>
                </template>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
@/stores/product
