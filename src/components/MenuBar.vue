<script>
export default {
    props: ["refs"],
    emits: ['scroll-to-element']
}</script>
<template>
    <div class="pb-5 relative flex flex-row justify-evenly w-full items-center ">
        <div
            class="text-center font-lexendZetta text-white sm:my-14 mx-6 text-xl scale-y-75 tracking-widest hover:line-through hover:cursor-pointer">
            <a @click="$emit('scroll-to-element','home')">
                home
            </a>
        </div>
        <div
            class="text-center font-lexendZetta text-white sm:my-14 mx-6 text-xl scale-y-75 tracking-widest hover:line-through hover:cursor-pointer">
            <a @click="$emit('scroll-to-element', 'sixDegrees')">
                six degrees
            </a>
        </div>
        <div class=" text-center font-lexendZetta text-white sm:my-14 mx-6 text-xl scale-y-75 tracking-widest
                hover:line-through hover:cursor-pointer">
            <a @click="$emit('scroll-to-element', 'about')">
                about
            </a>
        </div>
    </div>
</template>