<template>
    <Teleport to="body">
        <div v-if="this.showModal">
            <div @click="$emit('close-modal')" class='backdrop'>
                <div class='modal' @click.stop>
                    <Cross @click="$emit('close-modal')" class='closeIcon' />
                    <div class='modalContent'>
                        <h1 class='modalTitle p-3'>
                            <slot name="title"></slot>
                        </h1>
                        <img class='modalImage' src="@/assets/images/nakamura-disgusted.gif"
                            alt='Hikaru absolutely disgusted' />
                        <p class='modalBody font-Sen p-10'>
                            <slot name="body"></slot>
                        </p>
                        <button @click="$emit('close-modal')" class='modalDismiss'>I literally don't care</button>

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
        </div>
    </Teleport>
</template>

<script>
// import "https://platform.twitter.com/widgets.js";
import Twitter from './svg/Twitter.vue';
import RedditShareButton from './svg/RedditShareButton.vue';
import Facebook from './svg/Facebook.vue';
import Copy from './svg/Copy.vue';
import Cross from './svg/Cross.vue';
export default {

    props: {
        isShareable: Boolean,
        showModal: Boolean,
    },
    emits: ['close-modal'],
    data() {
        return {
        }
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal;
        }
    },
    components: {
        Twitter,
        RedditShareButton,
        Facebook,
        Copy,
        Cross
    }

}
</script>

<style scoped>
.modal {
    border-radius: 10px;
    backdrop-filter: blur(50px);
    background-color: white;
    min-height: 30rem;
    margin: 1rem;
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
    height: 5.5rem;
    padding: 1rem;
}


.modalDismiss:hover {
    background-color: #95bb4a;
    cursor: pointer;
}

.modalTitle {
    font-size: 3rem;
    margin: 1rem;
}

.modalImage {
    margin: auto;
    border-radius: 5px;
}

.closeIcon {
    position: absolute;
    top: 25px;
    right: 25px;
    height: 1.2rem;
    margin: 0.2rem;
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
}

@media only screen and (max-width: 1024px) {
    .modal {
        max-width: 70vw;
        max-height: 80vh;
    }

    .modalDismiss {
        font-size: 1.5rem;
    }

    .modalBody {
        font-size: 1.3rem;
    }
}
</style>