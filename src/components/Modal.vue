<script>
// import "https://platform.twitter.com/widgets.js";
import Twitter from './svg/Twitter.vue';
import RedditShareButton from './svg/RedditShareButton.vue';
import Facebook from './svg/Facebook.vue';
import Copy from './svg/Copy.vue';
import Cross from './svg/Cross.vue';
import magnusCarlsenWhat from '@/assets/images/magnus-carlsen-what.gif';
import garyKasparov from '@/assets/images/nakamura-disgusted.gif';
import queensGambit from '@/assets/images/gary-kasparov.gif';
import nakamuraDisgusted from '@/assets/images/queens-gambit.webp';
import magnus from '@/assets/images/magnus-carlsen.gif';
import hikaruSurprise from '@/assets/images/hikaru-surprise.gif';

const GIFS = [nakamuraDisgusted, magnusCarlsenWhat, garyKasparov, queensGambit, magnus, hikaruSurprise];
export default {

    props: {
        isShareable: Boolean,
        showModal: Boolean,
        showGif: Boolean,
    },
    emits: ['close-modal'],
    data() {
        return {
            gifName: magnusCarlsenWhat
        }
    },
    components: {
        Twitter,
        RedditShareButton,
        Facebook,
        Copy,
        Cross
    },
    methods: {
        closeModal() {
            this.gifName = GIFS[Math.floor(Math.random() * GIFS.length)];
            this.$emit('close-modal');

        }
    }

}
</script>


<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="this.showModal" @click="this.closeModal" class='backdrop'>
                <div class='modal' @click.stop>
                    <div class="w-full text-right h-0">
                        <Cross @click="this.closeModal" class='closeIcon' />
                    </div>
                    <div class='modalContent'>
                        <h1 class='modalTitle font-bold'>
                            <slot name="title">Oops...</slot>
                        </h1>
                        <img v-if="this.showGif" class='modalImage' :src="this.gifName"
                            alt='Hikaru absolutely disgusted' />
                        <p class='modalBody font-Sen p-5'>
                            <slot name="body">Something went wrong :(</slot>
                        </p>
                        <button @click="this.closeModal" class='modalDismiss'>I literally don't care</button>

                        <div v-if="this.isShareable" class="flex justify-evenly items-center m-10">
                            <button class="p-2 bg-[#1DA1F2] rounded-md font-bold m-4 aspect-square">
                                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" data-show-count="false">
                                    <Twitter class="fill-white h-8" />
                                </a>
                            </button>

                            <button class="p-2 bg-[#ff4500] text-white rounded-md font-bold m-4 aspect-square">
                                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" data-show-count="false">
                                    <RedditShareButton class="fill-white h-8" />
                                </a>
                            </button>

                            <button class="p-2 bg-[#4267B2] text-white rounded-md font-bold m-4 aspect-square">
                                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" data-show-count="false">
                                    <Facebook class="fill-white h-8" />
                                </a>
                            </button>

                            <button class="p-2 text-white rounded-md font-bold m-4 aspect-square">
                                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" data-show-count="false">
                                    <Copy class="fill-zinc-800 h-8" />
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal {
    border-radius: 10px;
    backdrop-filter: blur(50px);
    background-color: white;
    /* min-height: 30rem; */
    max-height: 95vh;
    max-width: 30rem;
    margin: 1rem;
    overflow-x: hidden;
}

.modalContent {
    padding: 1rem;
    text-align: center;
}

.modalDismiss {
    color: white;
    background-color: #81A554;
    font-size: 2rem;
    font-weight: 800;
    line-height: 1.2;
    text-shadow: 0 .1rem 0 rgba(0, 0, 0, .4);
    transition: all .07s;
    border-radius: 1rem;
    border: none;
    border-bottom: .5rem solid #537133;
    /* height: 5.5rem; */
    padding: 1rem;
}


.modalDismiss:hover {
    background-color: #95bb4a;
    cursor: pointer;
}

.modalTitle {
    font-size: 3rem;
    margin-bottom: 1rem;
    padding: 1rem;
}

.modalImage {
    margin: auto;
    border-radius: 5px;
    max-height: 18rem;
    object-fit: cover;
}

.closeIcon {
    height: 1.2rem;
    margin: 1rem;
    display: inline-block;
    fill: rgb(34, 34, 34);
}

.closeIcon:hover {
    cursor: pointer;

}

.modalBody {
    /* font-family: Arial, Helvetica, sans-serif; */
    font-size: 1.5rem;
    margin: 1rem;
}

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    backdrop-filter: blur(5px);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 30;
    background-color: rgba(0, 0, 0, 0.418);
    overflow: hidden;
}

@media only screen and (max-width: 1024px) {
    .modal {
        max-height: 80vh;
    }

    .modalDismiss {
        font-size: 1.5rem;
    }

    .modalBody {
        font-size: 1.3rem;
    }

    .modalImage {
        height: 9rem;
    }
}

.modal-move,
.modal-enter-active,
.modal-leave-active {
    transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
}

.modal-move .modal,
.modal-enter-active .modal,
.modal-leave-active .modal {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
    transform: scale(0.9);
}
</style>