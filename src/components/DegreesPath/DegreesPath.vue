
<script>
import Profile from './Profile';
import pfp from "../../images/pfp.jpeg";
import levy from "../../images/levy.jpeg";
import aman from "../../images/aman.jpeg";
import daniel from "../../images/daniel.jpeg";
import PathBackground from '../stylistic/PathBackground';

export default {
    components: {
        Profile
    },
    props: ['pathArray']
}
</script>

<template>
    <div class='w-screen text-center md:mt-10 2xl:mt-20'>
        <div class="min-h-screen w-96 xl:w-[40rem] relative inline-block">
            <PathBackground />
            <Profile name="'Patrick Edwards'" username="'FuzzyLogic12'" title="''" rating="2000" profilePicture="pfp"
                position="'left'" />
            <Profile name="'Aman Hambleton'" username="'KVBN'" title="'GM'" rating="2000" profilePicture="aman"
                position="'right'" />
            <Profile name="'Levy Rozman'" username="'GothamChess'" title="'IM'" rating="2000" profilePicture="levy"
                position="'left'" />
            <Profile name="'Daniel Naroditsky'" username="'SenseiDanya'" title="'GM'" rating="2000"
                profilePicture="daniel" position="'right'" />
        </div>
    </div>
    </template>
