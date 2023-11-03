<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'

const authStore = useAuthStore()
const form = reactive({
    email: '',
    pass: '',
})
</script>

<template>
    <LayoutGuest>
        <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
            <CardBox :class="cardClass" is-form @submit.prevent="authStore.handleLogin(form)">
                <FormField label="Email" help="Please enter your email">
                    <FormControl
                        v-model="form.email"
                        :icon="mdiAccount"
                        type="email"
                        name="email"
                        autocomplete="email"
                        placeholder="example@gmail.com"
                    >
                        <div v-if="authStore.errors.email">
                            <span class="text-red-400 text-sm p-2">{{ authStore.errors.email[0] }}</span>
                        </div>
                    </FormControl>
                </FormField>

                <FormField label="Password" help="Please enter your password">
                    <FormControl
                        v-model="form.pass"
                        :icon="mdiAsterisk"
                        type="password"
                        name="password"
                        autocomplete="current-password"
                        placeholder="********"
                    >
                        <div v-if="authStore.errors.password">
                            <span class="text-red-400 text-sm p-2">{{ authStore.errors.password[0] }}</span>
                        </div>
                    </FormControl>
                </FormField>

                <template #footer>
                    <BaseButtons>
                        <BaseButton type="submit" color="info" label="Login" />
                    </BaseButtons>
                </template>
            </CardBox>
        </SectionFullScreen>
    </LayoutGuest>
</template>
