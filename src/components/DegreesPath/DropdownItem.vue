<script>
import ChessTitle from './ChessTitle.vue';
export default {
    props: ['autofillItem'],
    methods: {
        imageLoaded() {
            this.$emit('imageLoaded')
        }
    },
    components: {
        ChessTitle
    }
}

</script>

<template>
    <div class="flex flex-row gap-5 items-center">
        <div class="flex flex-row">
            <img :src="this.autofillItem.icon" class="h-8" @load="this.imageLoaded" />
            <ChessTitle v-if="this.autofillItem.chess_title">
                {{ this.autofillItem.chess_title }}
            </ChessTitle>
        </div>
        <div>
            {{ this.autofillItem.title }}
        </div>
    </div>
</template>