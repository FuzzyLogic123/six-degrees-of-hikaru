
<script>
import LongArrow from "../svg/ShortArrow.vue";
import ChessTitle from './ChessTitle.vue'

export default {
    props: {
        profilePicture: String,
        position: String,
        showArrow: Boolean,
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
        <a :href="`https://www.chess.com/stats/live/${this.timeControl}/${this.username}`" target="_blank"
            class="hover:underline">
            <div class='px-4 text-center inline-block relative w-72 underline-inherit'>
                <img class="rounded-[50%] m-auto border-white border-2 h-28 w-28 my-2 object-cover"
                    :src="this.profilePicture || 'https://www.chess.com/bundles/web/images/user-image.007dad08.svg'"
                    alt='user profile avatar' />
                <h1
                    class='font-Outfit text-white tracking-wider text-lg lg:text-xl xl:text-2xl inline-block my-1 underline-inherit'>
                    <slot name="username"></slot>
                </h1>
                
                <h2 v-if="$slots.name" class='text-white font-Mono text-md lg:text-md font-thin xl:text-xl h-8'>
                    <slot name="name"></slot>
                </h2>

                <ChessTitle v-if="$slots.title">
                    <slot name="title"></slot>
                </ChessTitle>

                <h3 class='text-white font-Mono font-thin text-sm lg:text-md xl:text-lg'>
                    <slot name="rating"></slot>
                </h3>
            </div>
        </a>
    </div>
    <div v-if="this.showArrow" class='relative w-full text-center scale-75'>
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