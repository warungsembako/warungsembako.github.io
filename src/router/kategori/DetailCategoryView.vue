<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { mdiArrowLeftThinCircleOutline } from '@mdi/js'
import { useCategoryStore } from '@/stores/category'

const route = useRoute()
const categoryStore = useCategoryStore()

const data = reactive({
    category: '',
})

const id = route.params.id

onMounted(async () => {
    await categoryStore.getCategoryById(id)
    data.category = categoryStore.category.attributes.category
})
</script>

<template>
    <LayoutAuthenticated>
        <SectionMain>
            <CardBox>
                <RouterLink :to="{ name: 'data-kategori' }" class="hover:text-indigo-600">
                    <BaseIcon :path="mdiArrowLeftThinCircleOutline" size="34" w="" h="h-16" />
                </RouterLink>
                <h1 class="text-center text-2xl mb-4">Detail Data Kategori</h1>
                <div class="mt-4">
                    <h2 class="text-gray-500 mt-3">Nama Kategori</h2>
                    <p class="mt-2 text-lg">{{ data.category }}</p>
                </div>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
