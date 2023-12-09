<script setup>
import { onMounted } from 'vue'
// import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import Table from '@/components/TableDatacust.vue'
// import BaseButton from '@/components/BaseButton.vue'
// import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useTransactionStore } from '@/stores/transaction'
import { formatNumberToCurrency } from 'rupiah-currency-formatter'

const transactionStore = useTransactionStore()

const thead = ['Tgl Transaksi', 'No. Transaksi', 'Nama', 'Jumlah', 'Harga', 'Total']

const columns = [
    {
        type: 'attributes',
        label: 'Tgl Transaksi',
        keyItems: (obj) => obj.created_at,
    },
    {
        type: 'attributes',
        label: 'No. Transaksi',
        keyItems: (obj) => obj.transaction_number,
    },
    {
        type: 'relationships',
        label: 'Nama',
        relationships: (obj) => obj.product,
        keyItems: (obj) => obj.attributes.name,
    },
    {
        type: 'attributes',
        label: 'Jumlah',
        keyItems: (obj) => obj.qty,
    },
    {
        type: 'relationships',
        label: 'Harga',
        relationships: (obj) => obj.product,
        keyItems: (obj) => formatNumberToCurrency(Math.ceil(obj.attributes.price_sell)),
    },
    {
        type: 'attributes',
        label: 'Total',
        keyItems: (obj) => formatNumberToCurrency(Math.ceil(obj.total)),
    },
]

onMounted(async () => {
    await transactionStore.getTransactions()

    window.print()
})
</script>

<template>
    <LayoutAuthenticated>
        <SectionMain>
            <CardBox>
                <h1 class="text-center text-2xl mb-4">Riwayat Transaksi</h1>
                <RouterLink to="data-riwayat-transaksi-cetak">
                    <BaseButton color="success" label="Cetak Data" :icon="mdiPlus" class="mb-2"></BaseButton>
                </RouterLink>

                <Table
                    :items="transactionStore.transactions"
                    :add="false"
                    :is-edit="false"
                    :is-detail="false"
                    :is-delete="false"
                    :thead="thead"
                    :paginate="false"
                    :columns="columns"
                />
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
