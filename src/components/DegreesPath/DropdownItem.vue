<script>
import ChessTitle from './ChessTitle.vue'
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
    <div class="flex flex-row gap-2 items-center">
        <img :src="this.autofillItem.icon" class="h-8 mx-1" @load="this.imageLoaded" />
        <ChessTitle v-if="this.autofillItem.chess_title">
            {{ this.autofillItem.chess_title }}
        </ChessTitle>
        <div>
            {{ this.autofillItem.title }}
        </div>
    </div>
</template>