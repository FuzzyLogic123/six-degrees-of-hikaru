
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
            <PathBackground />
            <Profile name="'Patrick Edwards'" username="'FuzzyLogic12'" title="" rating="2000" :profilePicture="this.images.pfp"
                position="left" />
            <Profile name="Aman Hambleton" username="'KVBN'" title="GM" rating="2000" :profilePicture="this.images.Aman"
                position="right" />
            <Profile name="Levy Rozman" username="'GothamChess'" title="IM" rating="2000" :profilePicture="this.images.levy"
                position="left" />
            <Profile name="'Daniel Naroditsky'" username="'SenseiDanya'" title="GM" rating="2000"
                :profilePicture="this.images.daniel" position="right" />
        </div>
    </div>
    </template>
