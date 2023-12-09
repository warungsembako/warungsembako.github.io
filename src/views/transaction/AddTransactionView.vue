<script setup>
import { onMounted, reactive } from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useProductStore } from '@/stores/product'
import { useTransactionStore } from '@/stores/transaction'
import { formatNumberToCurrency } from 'rupiah-currency-formatter'

const productStore = useProductStore()
const transactionStore = useTransactionStore()

const form = reactive({
    product: '',
    qty: 1,
})

const handleReset = () => {
    form.product = ''
    form.qty = 1
}

onMounted(async () => {
    productStore.getProducts()
})
</script>

<template>
    <LayoutAuthenticated>
        <SectionMain>
            <CardBox is-form @submit.prevent="transactionStore.handleAddData(form)">
                <h1 class="text-center text-2xl mb-4">Tambah Data Transaksi</h1>
                <FormField label="Pilih Produk">
                    <FormControl
                        v-model="form.product"
                        type="select"
                        :options="productStore.products"
                        select-label="name"
                    >
                        <div v-if="productStore.errors.product_id">
                            <span class="text-red-400 text-sm p-2">{{ productStore.errors.product_id[0] }}</span>
                        </div>
                    </FormControl>
                </FormField>
                <FormField label="Jumlah">
                    <FormControl v-model="form.qty" type="number" min="1">
                        <div v-if="productStore.errors.qty">
                            <span class="text-red-400 text-sm p-2">{{ productStore.errors.qty[0] }}</span>
                        </div>
                    </FormControl>
                </FormField>
                <hr />
                <div v-if="form.product">
                    <h2 class="text-gray-500 mt-3">Nama</h2>
                    <p class="mt-2 text-lg">{{ form.product.attributes.name }}</p>
                    <h2 class="text-gray-500 mt-3">Harga</h2>
                    <p class="mt-2 text-lg">{{ formatNumberToCurrency(Math.ceil(form.product.attributes.price_sell)) }}</p>
                    <h2 class="text-gray-500 mt-3">Jumlah</h2>
                    <p class="mt-2 text-lg">
                        {{ form.qty + ' ' + form.product.relationships.unit.attributes.unit }}
                    </p>
                    <h2 class="text-gray-500 mt-3">Total</h2>
                    <p class="mt-2 text-lg">{{ formatNumberToCurrency(Math.ceil(form.product.attributes.price_sell * form.qty)) }}</p>
                </div>
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
