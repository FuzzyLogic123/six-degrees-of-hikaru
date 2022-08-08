<script>
export default {
    emits: ['scroll-to-element']
}</script>
<template>
<a @click="$emit('scroll-to-element', 'sixDegrees')">
    <button
        class="uppercase font-Outfit border-2 px-12 text-center py-5 text-sm text-white tracking-[0.5rem] hover:bg-white hover:text-black transition-colors">

        find your path
    </button>
</a>
</template>