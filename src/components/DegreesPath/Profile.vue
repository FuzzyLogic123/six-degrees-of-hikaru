
<script>
import LongArrow from "../svg/ShortArrow.vue";
import ChessTitle from './ChessTitle.vue'

export default {
    props: {
        profilePicture: String,
        position: String,
        isHikaru: Boolean,
        username: String
    },
    components: {
        LongArrow,
        ChessTitle
    },
    inject: ["timeControl"],
    data() {
        return {
            randomisedScale: 1 - Math.random() * 0.1
        }
    },
}
</script>

<template>
    <div :style="{ transform: `scale(${this.randomisedScale})` }"
        :class="['w-full relative origin-center max-w-[100vw]', position]">
        <div class='px-4 text-center inline-block relative'>
            <img class="rounded-full m-auto border-white border-2 h-28 aspect-square my-2"
                :src="this.profilePicture || 'https://www.chess.com/bundles/web/images/user-image.007dad08.svg'"
                alt='user profile avatar' />
            <a :href="`https://www.chess.com/stats/live/${this.timeControl}/${this.username}`" target="_blank"
                class="hover:underline">
                <h1
                    class='font-Outfit text-white tracking-wider text-lg lg:text-xl xl:text-2xl inline-block my-1 underline-inherit'>
                    <slot name="name"></slot>
                </h1>

                <ChessTitle v-if="$slots.title">
                    <slot name="title"></slot>
                </ChessTitle>
                
                <h2 class='text-white font-Mono text-md lg:text-lg font-thin xl:text-2xl xl:m-2'>
                    <slot name="username"></slot>
                </h2>
            </a>
            <h3 class='text-white font-Mono font-thin text-sm lg:text-md xl:text-lg'>
                <slot name="rating"></slot>
            </h3>
        </div>
    </div>
    <div v-if="!this.isHikaru" class='relative w-full text-center scale-75'>
        <div :class="[{ flipArrow: position === 'left' }, 'inline-block']">
            <LongArrow class='arrow-rotation' />
        </div>
    </div>
</template>

<style scoped>
.left {
    text-align: left;
}

.right {
    text-align: right;
}

.flipArrow {
    transform: scaleX(-1);
}

.underline-inherit {
    text-decoration: inherit;
}
</style>