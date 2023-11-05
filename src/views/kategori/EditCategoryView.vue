<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
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

const route = useRoute()
const categoryStore = useCategoryStore()

const form = reactive({
    category: '',
})

const id = route.params.id

const handleReset = () => {
    form.category = ''
}

onMounted(async () => {
    await categoryStore.getCategoryById(id)
    form.category = categoryStore.category.attributes.category
})
</script>

<template>
    <LayoutAuthenticated>
        <SectionMain>
            <CardBox is-form @submit.prevent="categoryStore.handleUpdateData(form, id)">
                <RouterLink :to="{ name: 'data-kategori' }" class="hover:text-indigo-600">
                    <BaseIcon :path="mdiArrowLeftThinCircleOutline" size="34" w="" h="h-16" />
                </RouterLink>
                <h1 class="text-center text-2xl mb-4">Edit Data Kategori</h1>

                <FormField label="Nama Kategori">
                    <FormControl v-model="form.category" placeholder="Nama Kategori...">
                        <div v-if="categoryStore.errors.category">
                            <span class="text-red-400 text-sm p-2">{{ categoryStore.errors.category[0] }}</span>
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
