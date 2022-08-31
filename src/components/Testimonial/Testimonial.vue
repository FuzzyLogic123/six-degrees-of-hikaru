<script>
import Quote from "../svg/Quote.vue";
export default {
    props: ['quote'],
    components: {
        Quote
    },
}

</script>

<template>
    <div>
        <div
            class="relative bg-[#31415985] leading-8 p-4 pt-24 text-center text-white text-xl rounded-lg sm:max-w-[13rem] lg:max-w-sm 2xl:max-w-2xl mb-32 sm:mb-0 lg:m-6">
            <Quote
                class='sm:hidden xl:block z-20 stroke-white stroke-2 fill-transparent opacity-90 absolute lg:-left-14 lg:-top-4 -left-10 top-5 h-14' />
            <Quote
                class='sm:hidden xl:block z-20 stroke-white stroke-2 fill-transparent opacity-90 absolute lg:-right-20 lg:bottom-4 -right-20 bottom-24 h-14 -scale-100 rotate-2' />
            <img :src="this.quote[2]" alt="The Pope"
                class="absolute z-10 w-40 h-40 left-0 right-0 m-auto -top-24 rounded-full object-cover" />
            <p class="font-Outfit sm:text-sm md:text-lg lg:text-2xl">
                {{ this.quote[0] }}
            </p>
            <br />
            <p class="sm:text-4xl md:text-4xl font-semibold font-Ephesis tracking-[5px] z-30">
                {{ "-" + this.quote[1] }}
            </p>
        </div>
    </div>
</template >

    <style scoped>
    </style>
