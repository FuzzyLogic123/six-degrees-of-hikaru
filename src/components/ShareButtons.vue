<script>
import Twitter from './svg/Twitter.vue';
import RedditShareButton from './svg/RedditShareButton.vue';
import Facebook from './svg/Facebook.vue';
import Copy from './svg/Copy.vue';
export default {
    components: {
        Facebook,
        Twitter,
        RedditShareButton,
        Copy
    },
    props: {
        shareableText: String
    },
    methods: {
        copyToClipboard(text) {
            navigator.clipboard.writeText(text);
        }
    }
}
</script>

<template>
    <div class="flex justify-evenly items-center mt-3">
        <button class="p-2 bg-[#1DA1F2] rounded-md font-bold m-4 aspect-square">
            <a :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(this.shareableText)}&url=https://sixdegreesofhikaru.com&hashtags=chess,kevinbacon`"
                target="_blank">
                <Twitter class="fill-white h-8" />
            </a>
        </button>

        <button class="p-2 bg-[#ff4500] text-white rounded-md font-bold m-4 aspect-square">
            <a :href="`http://www.reddit.com/submit?url=https://sixdegreesofhikaru.com&title=${encodeURIComponent('Find the chain of users from you to Hikaru')}`"
                target="_blank">
                <RedditShareButton class="fill-white h-8" />
            </a>
        </button>

        <button class="p-2 bg-[#4267B2] text-white rounded-md font-bold m-4 aspect-square">
            <a href="http://www.facebook.com/share.php?u=https://sixdegreesofhikaru.com" target="_blank">
                <Facebook class="fill-white h-8" />
            </a>
        </button>

        <button class="p-2 text-white rounded-md font-bold m-4 aspect-square">
            <div @click="this.copyToClipboard(this.shareableText)">
                <Copy class="fill-zinc-700 h-8 hover:fill-zinc-900" />
            </div>
        </button>
    </div>
</template>

<style scoped>
button:active {
    transform: scale(0.9);
    transition: cubic-bezier(0.075, 0.82, 0.165, 1);
    transition-duration: 0.06s;
}
</style>