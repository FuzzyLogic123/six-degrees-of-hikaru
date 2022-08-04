<script>
import QuestionMarkSvg from './svg/QuestionMark.svg';
import ConnectionsSvg from './svg/Connections.svg';

export default {
    props: ["colour", "mainText", "secondaryText", "svg"],
    data() {
        return {
            icons: {
                "QuestionMark": QuestionMarkSvg,
                "Connection": ConnectionsSvg,
            }
        };
    },
}
</script>

<template>
    <div class="m-8 2xl:m-44 md:m-20">
        <img :src="this.icons[this.svg]" class="scale-75" />
        <h3 :style="{ color: this.colour }" class='m-1 text-xl md:text-2xl xl:text-3xl font-bold md:font-medium'>
            {{ this.secondaryText }}
        </h3>
        <h1 class="capitalize text-white text-5xl md:text-7xl xl:text-9xl font-bold">{{ this.mainText }}</h1>
    </div>
</template>