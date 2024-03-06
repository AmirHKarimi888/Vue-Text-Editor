<script setup lang="ts">
import { onMounted } from "vue";
import { HeaderView } from "./components";
import { useStore, useUsersStore } from "./store";

onMounted(async () => {
    await useUsersStore()
    .getSignedInUser()
    .then(() => console.log(useUsersStore().loggedInUser))
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
