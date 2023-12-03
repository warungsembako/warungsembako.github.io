<script setup>
import { reactive, onMounted } from 'vue'
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

const route = useRoute()
const satuanStore = useSatuanStore()
const id = route.params.id

const form = reactive({
    satuan: '',
    keterangan: '',
})
const handleReset = () => {
    form.satuan = ''
    form.keterangan = ''
}

onMounted(async () => {
    await satuanStore.getSatuanById(id)

    form.satuan = satuanStore.unit.attributes.unit
    form.keterangan = satuanStore.unit.attributes.desc
})
</script>

<template>
    <LayoutAuthenticated>
        <SectionMain>
            <CardBox is-form @submit.prevent="satuanStore.handleUpdateData(form, id)">
                <RouterLink :to="{ name: 'data-satuan' }" class="hover:text-indigo-600">
                    <BaseIcon :path="mdiArrowLeftThinCircleOutline" size="34" w="" h="h-16" />
                </RouterLink>
                <h1 class="text-center text-2xl">Edit Data Satuan</h1>
                <FormField label="Satuan">
                    <FormControl v-model="form.satuan" placeholder="Kg / L / Gr dsb...">
                        <div v-if="satuanStore.errors.satuan">
                            <span class="text-red-400 text-sm p-2">{{ satuanStore.errors.satuan[0] }}</span>
                        </div>
                    </FormControl>
                </FormField>
                <FormField label="Keterangan">
                    <FormControl v-model="form.keterangan" placeholder="Liter dsb...">
                        <div v-if="satuanStore.errors.keterangan">
                            <span class="text-red-400 text-sm p-2">{{ satuanStore.errors.keterangan[0] }}</span>
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
