<script setup lang="ts">
import { onMounted } from "vue";
import { HeaderView } from "./components";
import { useStore } from "./store";

onMounted(() => {
    
})
</script>

<template>
    <header>
        <HeaderView />
    </header>

    <main>
        <component :is="useStore().displayingView"></component>
    </main>
</template>

<style scoped>

</style>
