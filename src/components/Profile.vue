<template>
    <div class="profile-container flex hidden max-[500px]:justify-center z-20">
        <div class="profile fixed top-16 min-[501px]:right-24 w-[340px] max-[500px]:w-[90%] bg-white shadow-2xl rounded-lg border box-border dark:bg-gray-800 dark:border-none dark:text-white">
        <div class="profile-title font-bold p-5 border-b flex justify-start gap-3 dark:border-none">
            <span v-if="useUsersStore().loggedInUser" class="header-profile-title-avatar"><img class="w-12 cursor-pointer rounded-full" :src="useUsersStore().loggedInUser?.avatar" alt="avatar" /></span>
            <span class="profile-title-username text-lg">
                {{ useUsersStore().loggedInUser?.username }}
                <span class="profile-title-email text-sm block text-gray-500">{{ useUsersStore().loggedInUser?.email }}</span>
            </span>
        </div>

        <div @click="signOut" class="profile-signout-btn mb-7 mx-auto text-center w-[90%] p-3 text-white bg-emerald-500 rounded-lg hover:bg-emerald-400 duration-300 cursor-pointer">Sign Out</div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '../store';

const signOut = () => {
    localStorage.setItem("loggedInUser", "");
    window.location.href = "/";
}
</script>