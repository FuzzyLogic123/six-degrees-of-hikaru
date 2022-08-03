<script>
import Testimonial from './Testimonial.vue'
export default {
    props: ['quotes'],
    components: {
        Testimonial
    }
}
</script>

<template>
    <div class="relative flex sm:flex-row flex-col justify-evenly items-center mx-0 mt-32 xl:mt-56 2xl:mt-96">
        <div v-for="quote in this.quotes" :class="`${i === 1 ? ' hidden' : ''} sm:block`">
            <Testimonial quote="quote" />
        </div>
    </div>
</template >

<style scoped>
</style>
