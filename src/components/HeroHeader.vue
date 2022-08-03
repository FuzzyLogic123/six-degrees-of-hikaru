<script>
export default {
    props: ['colour', 'mainText', 'secondaryText', 'svg']
}
</script>

<template>
    <div class="m-8 2xl:m-44 md:m-20">
        {svg}
        <h3 :style="{ color: colour }" class='m-1 text-xl md:text-2xl xl:text-3xl font-bold md:font-medium'>
            {{ secondaryText }}
        </h3>
        <h1 class="capitalize text-white text-5xl md:text-7xl xl:text-9xl font-bold">{{ mainText }}</h1>
    </div>
</template>