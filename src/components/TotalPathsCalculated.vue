<script>
import { onSnapshot } from "firebase/firestore";
import { docRef } from '@/firebaseConfig.js';
    export default {
        data() {
            return {
                totalPathsCalculated: 0
            }
        },
        created() {
            onSnapshot(docRef, (doc) => {
                console.log("Current data: ", doc.data());
                this.totalPathsCalculated = doc.data().numberOfPathsCalculated;
            });
        }
    }
</script>

<template>
    <div class="sm:py-20 xl:py-36">
        <h1 class="text-5xl xl:text-7xl uppercase leading-tight text-white text-center py-0 px-4">paths to
            <b>Hikaru</b> calculated so far
        </h1>
        <h1 class="text-8xl xl:text-9xl font-bold text-center py-14 text-[#EA0990]">{{this.totalPathsCalculated}}</h1>
    </div>
</template>