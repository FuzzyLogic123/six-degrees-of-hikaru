
<script>
import Profile from './Profile.vue';
import pfp from "@/assets/images/pfp.jpeg";
import levy from "@/assets/images/levy.jpeg";
import Aman from "@/assets/images/aman.jpeg";
import daniel from "@/assets/images/daniel.jpeg";
import PathBackground from '../Stylistic/PathBackground.vue';

export default {
    components: {
        Profile,
        PathBackground
    },
    props: ['pathArray'],
    data() {
        return {
            images: {
                pfp: pfp,
                levy: levy,
                Aman: Aman,
                daniel: daniel
                }
        }
    }
}
</script>

<template>
    <div class='w-screen text-center md:mt-10 2xl:mt-20'>
        <div class="min-h-screen w-96 xl:w-[40rem] relative inline-block">
            <PathBackground class="absolute"/>
            <Profile v-for="(profile, i) in this.pathArray" :name="profile.name" :username="profile.username" :title="profile.title" :rating="profile.rating" :profilePicture="profile.avatar" :position="i % 2 ? 'left': 'right'" />
        </div>
    </div>
    </template>
