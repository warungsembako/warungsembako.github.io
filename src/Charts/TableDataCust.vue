<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiEye, mdiTrashCan, mdiPlus, mdiPencil } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    thead: {
        type: Array,
        default: () => [],
    },
    columns: {
        type: Array,
        default: () => [],
    },
    link: {
        type: String,
        default: null,
    },
    linkEdit: {
        type: String,
        default: null,
    },
    linkDetail: {
        type: String,
        default: null,
    },
    isEdit: {
        type: Boolean,
        default: true,
    },
    isDelete: {
        type: Boolean,
        default: true,
    },
    isDetail: {
        type: Boolean,
        default: true,
    },
    add: {
        type: Boolean,
        default: true,
    },
    action: {
        type: Boolean,
        default: true,
    },
})

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const router = useRouter()

const items = computed(() => props.items)

const idItem = ref()

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(100)

const currentPage = ref(0)

const itemsPaginated = computed(() =>
    items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
    const pagesList = []

    for (let i = 0; i < numPages.value; i++) {
        pagesList.push(i)
    }

    return pagesList
})

const confirm = () => {
    emit('confirm', idItem.value)
}

const handleEdit = (id) => {
    router.push({ name: props.linkEdit, params: { id: id } })
}
const handleDetail = (id) => {
    router.push({ name: props.linkDetail, params: { id: id } })
}

const deleteModal = (id) => {
    isModalDangerActive.value = true
    idItem.value = id
}
</script>

<template>
    <CardBoxModal v-model="isModalActive" title="Sample modal">
        <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
        <p>This is sample modal</p>
    </CardBoxModal>

    <CardBoxModal
        v-model="isModalDangerActive"
        title="Konfirmasi"
        button="danger"
        button-label="Ya"
        has-cancel
        @confirm="confirm"
    >
        <p>Apakah anda yakin menghapus data ini?</p>
    </CardBoxModal>

    <RouterLink v-if="add" :to="{ name: link }">
        <BaseButton color="success" label="Tambah Data" :icon="mdiPlus" class="mb-2"></BaseButton>
    </RouterLink>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th v-for="(th, index) in thead" :key="index">
                    {{ th }}
                </th>
                <th v-if="action" />
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in itemsPaginated" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td v-for="(td, i) in columns" :key="i" :data-label="td.label">
                    {{
                        td.type == 'relationships'
                            ? td.keyItems(td.relationships(item.relationships))
                                ? td.keyItems(td.relationships(item.relationships))
                                : '-'
                            : td.keyItems(item.attributes)
                            ? td.keyItems(item.attributes)
                            : '-'
                    }}
                </td>
                <td v-if="action" class="before:hidden lg:w-1 whitespace-nowrap">
                    <BaseButtons type="justify-start lg:justify-end" no-wrap>
                        <BaseButton
                            v-if="isEdit"
                            color="warning"
                            :icon="mdiPencil"
                            small
                            @click="handleEdit(item.id)"
                        />
                        <BaseButton v-if="isDetail" color="info" :icon="mdiEye" small @click="handleDetail(item.id)" />
                        <BaseButton
                            v-if="isDelete"
                            color="danger"
                            :icon="mdiTrashCan"
                            small
                            @click="deleteModal(item.id)"
                        />
                    </BaseButtons>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <BaseLevel>
            <BaseButtons>
                <BaseButton
                    v-for="page in pagesList"
                    :key="page"
                    :active="page === currentPage"
                    :label="page + 1"
                    :color="page === currentPage ? 'lightDark' : 'whiteDark'"
                    small
                    @click="currentPage = page"
                />
            </BaseButtons>
            <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
        </BaseLevel>
    </div>
</template>
