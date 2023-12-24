<script setup lang="ts">

import { useStore } from '../store';


const closeAreYouSureModal = () => {
    useStore().areYouSureModalActive = false;
    useStore().areYouSureModalInfo = {
        message: "",
        function: ""
    };
}

</script>

<template>
    <div class="modalBackdrop" @click.self="closeAreYouSureModal">
        <div class="modal">
            <i class="fa fa-question-circle-o areYouSureIcon"></i>
            <h4>{{ useStore().areYouSureModalInfo?.message }}</h4>

            <div class="modalBtns">
                <div id="closeModalBtn" @click="closeAreYouSureModal">
                ❌ No
                </div>

                <div id="confirmBtn" @click="useStore().areYouSureModalInfo?.function">
                ✅ Yes
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>