<script setup>
import { containerMaxW } from '@/config.js'
</script>

<template>
    <section class="p-6 mb-2" :class="containerMaxW">
        <slot />
    </section>
</template>
