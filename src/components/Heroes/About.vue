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
            Inspired by the six degrees of seperation, this website uses a database of 109 427 users, calculating the
            chain
            to 2 degrees with a greedy breadth first search.
            <br /><br />
            If a user is not in the database, the algorithim will then find which user is the most optimal choice as the
            next player, until it finds a user in the database.
            <br /><br />
            Thanks for visiting and enjoying the website.
            It was a lot of effort and I appreciate you taking the time!
        </p>

    </div>
</template>