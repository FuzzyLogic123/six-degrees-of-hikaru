<script>
import Testimonial from './Testimonial.vue'
import ChrisRock from '@/assets/images/chris-rock.jpg';
import ThePope from '@/assets/images/the-pope.png';
import Jesus from '@/assets/images/jesus.jpg';
import Magnus from '@/assets/images/magnuscarlsonquoteimage.jpg'
import Hikaru from '@/assets/images/hikaruquoteimage.png';
import Anish from '@/assets/images/anishgiriselfie.jpg';
export default {
    components: {
        Testimonial
    },
    data() {
        return {
            quotes:
                [["I literalliy don't care", 'Jackie Chan', Hikaru],
                [`Dubov is a cocaine addict. Magnus is an alcoholic who goes to stip clubs every other day. Should I expose more?`, 'Anish Giri', Anish],
                ['How does the knight move?', 'Magnus Carlson', Magnus]]
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
