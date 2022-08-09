
<script>
import Profile from './Profile.vue';
import PathBackground from '../Stylistic/PathBackground.vue';

export default {
    components: {
        Profile,
        PathBackground
    },
    props: ['pathArray'],
    watch: {
        pathArray: {
            handler(newPath) {
                if (newPath.at(-1)?.name === "Hikaru Nakamura") {
                    const target = this.$refs.path;
                    // Target is outside the viewport from scroll otherwise don't
                    if (target.getBoundingClientRect().bottom > window.innerHeight || target.getBoundingClientRect().top < 0) {
                        target.scrollIntoView(false);
                    }
                }
            },
            deep: true,
            flush: 'post'
        },
    },
    data() {
        return {
        }
    }
}
</script>

<template>
    <div class='w-screen text-center'>
        <div class="w-96 xl:w-[45rem] relative inline-block">
            <div ref="path">
                <TransitionGroup name="fade">
                    <div v-for="(profile, i) in this.pathArray" :key="i">
                        <Profile :profilePicture="profile.avatar" :position="i % 2 ? 'left' : 'right'"
                            :isHikaru="profile.name === 'Hikaru Nakamura'" :key="i">
                            <template #name>
                                {{ profile.name }}
                            </template>
                            <template v-if="profile.title" #title>
                                {{ profile.title }}
                            </template>
                            <template #username>
                                {{ profile.username }}
                            </template>
                            <template #rating>
                                {{ profile.rating }}
                            </template>
                        </Profile>
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<style>
/* 1. declare transition */
.fade-move,
.fade-enter-active {
    transition: all 2s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>
