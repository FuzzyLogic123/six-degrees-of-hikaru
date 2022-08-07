
<script>
import LongArrow from "../svg/ShortArrow.vue";

export default {
    props: ['name', 'title', 'rating', 'profilePicture', 'username', 'position'],
    components: {
        LongArrow
    },
    data() {
        return {

        }
    }

}
</script>

<template>
    <div :style="{ transform: `scale(${1 - Math.random() * 0.1})` }"
        :class="['w-full relative origin-center', position]">
        <div class='px-4 text-center inline-block relative'>
            <img class="rounded-full m-auto border-white border-2 h-28 my-2" :src="this.profilePicture"
                alt='user profile avatar' />
            <h1 class='font-Outfit text-white tracking-wider text-lg lg:text-xl xl:text-2xl inline-block my-1'>
                {{ name }}
            </h1>
            <div v-if="this.title"
                class='bg-[#b33430] rounded-[0.3rem] text-white text-xs lg:text-md xl:text-lg font-semibold mx-3 inline-block p-1'>
                <p class='m-0 p-0 flex justify-center align-center leading-none'>
                    {{ title }}
                </p>
            </div>
            <h2 class='text-white font-Mono text-md lg:text-lg font-thin xl:text-2xl xl:m-2'>
                {{ username }}
            </h2>

            <h3 class='text-white font-Mono font-thin text-sm lg:text-md xl:text-lg'>
                {{ rating }}
            </h3>
        </div>
    </div>
    <div v-if="this.name !== 'Hikaru Nakamura'" class='relative w-full text-center scale-75'>
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
</style>