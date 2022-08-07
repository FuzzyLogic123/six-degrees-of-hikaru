<script>
import Testimonial from './Testimonial.vue'
import ChrisRock from '@/assets/images/chris-rock.jpg';
import ThePope from '@/assets/images/the-pope.png';
import Jesus from '@/assets/images/jesus.jpg';
export default {
    components: {
        Testimonial
    },
    data() {
        return {
            quotes:
                [[' This website means nothing to me', 'Kevin Hart', ChrisRock],
                ['Only when a mosquito lands on your testicles, will you truly learn to solve a problem without violence', 'Dalai Lama', ThePope],
                ['This made me a better chess player', 'Jesus', Jesus]]
        }
    }
}

</script>

<template>
    <div class="relative flex sm:flex-row flex-col justify-evenly items-center mx-0 mt-32 xl:mt-56 2xl:mt-96">
        <div v-for="(quote, i) in this.quotes">
            <Testimonial :quote="quote" :class="[i === 1 ? 'hidden' : '', 'sm:block']" />
        </div>
    </div>
</template>

<style scoped>
.hidden {
    display: hidden;
}
</style>
