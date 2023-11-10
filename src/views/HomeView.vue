<script setup>
import { onMounted } from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
    await authStore.getUser()
})
</script>

<template>
    <LayoutAuthenticated>
        <SectionMain>
            <CardBox>
                <h1 class="text-5xl">Welcome, {{ authStore.user.name }}</h1>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
