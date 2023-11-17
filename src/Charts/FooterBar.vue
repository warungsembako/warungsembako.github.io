<script setup>
import { containerMaxW } from '@/config.js'
import BaseLevel from '@/components/BaseLevel.vue'

const year = new Date().getFullYear()
</script>

<template>
    <footer class="py-2 px-6 fixed bg-white bottom-0 w-full" :class="containerMaxW">
        <BaseLevel>
            <div class="text-center md:text-left">
                <b>&copy;{{ year }}</b>
            </div>
        </BaseLevel>
    </footer>
</template>
