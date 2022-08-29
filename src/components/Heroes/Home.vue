<script>
    import FindPathButton from '../FindPathButton.vue';
    import LongArrow from '../svg/LongArrow.vue';
    import HikaruPhoto from '../HikaruPhoto.vue';
    import Logo from '../Logo.vue';

    export default {
        components: {
            FindPathButton,
            LongArrow,
            HikaruPhoto,
            Logo
        },
        emits: ['scroll-to-element']
    }
</script>

<template>
    <div class="relative flex flex-col xl:flex-row xl:ml-28">
        <div class="relative flex flex-col sm:gap-7 flex-1 items-center justify-start">
            <div id='home' class="scale-50 sm:scale-100 2xl:scale-[1.3] m-0 xl:m-0 2xl:p-28">
                <Logo />
            </div>
            <div class="m-5 sm:m-10 2xl:scale-150">
                <FindPathButton @scroll-to-element="event => $emit('scroll-to-element', event)" />
            </div>
        </div>
        <p
            class="absolute -left-36 bottom-40 font-LibreBarcode128 text-white -rotate-90 text-xl tracking-[7px] 2xl:text-4xl">
            six degrees
        </p>
        <div class="absolute -left-24 bottom-6 scale-[0.25] 2xl:scale-[0.5] 2xl:bottom-36 2xl:-left-20">
            <LongArrow class="stroke-slate-200 stroke-2 fill-white" />
        </div>
        <div class="hidden xl:flex flex-1 items-center justify-center">
            <div class="scale-50 xl:scale-100 2xl:scale-[1.5] 2xl:mt-48">
                <HikaruPhoto />
            </div>
        </div>
    </div>
</template>