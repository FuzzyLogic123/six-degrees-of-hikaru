<script>
import HeroHeader from '../HeroHeader.vue';

export default {
    components: {
        HeroHeader,
    }
}
</script>

<template>
    <div id='about'>
        <HeroHeader svg="QuestionMark" colour="#53DAA1">
            <template #main-text>
                About the website
            </template>
            <template #secondary-text>
                How it works
            </template>

        </HeroHeader>


        <p
            class="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-7 text-center font-Sen m-10 md:m-20 xl:m-32 2xl:mx-72">
            The aim of this website is to find the quickest path from you to Grandmaster Hikaru by games won.
            <br /><br />
            Inspired by the six degrees of seperation, this website uses blitz and bullet databases of 5 252 558 and 1 735
            900 unique users respectively, calculating the
            chain
            to 3 degrees. It is stored as a directed minimum spanning tree (for you computer science nerds).
            <br /><br />
            If a user is not in the database, the algorithim will then find which user is the most optimal choice as the
            next player, until it finds a user in the database.
            <br /><br />
            Thanks for visiting and enjoying the website.
            It was a lot of effort and I appreciate you taking the time!
        </p>

    </div>
</template>