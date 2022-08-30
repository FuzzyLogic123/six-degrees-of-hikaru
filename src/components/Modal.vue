<script>
import Cross from './svg/Cross.vue';
import magnusCarlsenWhat from '@/assets/images/magnus-carlsen-what.gif';
import garyKasparov from '@/assets/images/nakamura-disgusted.gif';
import queensGambit from '@/assets/images/gary-kasparov.gif';
import nakamuraDisgusted from '@/assets/images/queens-gambit.webp';
import magnus from '@/assets/images/magnus-carlsen.gif';
import hikaruSurprise from '@/assets/images/hikaru-surprise.gif';
import outstandingMove from '@/assets/images/outstanding-move.png';
import yoda from '@/assets/images/yoda.png';
import hans from '@/assets/images/hans.png';
import ytComment from '@/assets/images/yt-comment.webp';
import ShareButtons from './ShareButtons.vue';

export default {

    props: {
        showModal: Boolean,
        showImage: Boolean,
        category: String,
    },
    emits: ['close-modal'],
    data() {
        return {
            images: {
                failure: [nakamuraDisgusted, magnusCarlsenWhat, garyKasparov, queensGambit, magnus, hikaruSurprise],
                success: [outstandingMove, yoda, hans, ytComment]
            },
        }
    },
    components: {
        Cross,
        ShareButtons
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        getRandomImage(category) {
            const images = this.images[category];
            return images[Math.floor(Math.random() * images.length)];
        },
        preloadImages() {
            for (const key in this.images) {
                for (let i = 0; i < this.images[key].length; i++) {
                    const imageSrc = this.images[key][i];
                    const image = new Image();
                    image.src = imageSrc;
                }
            }
        }
    },
    created() {
        setTimeout(this.preloadImages, 3000);
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
                        <img v-if="this.showImage" class='modalImage' :src="getRandomImage(this.category)"
                            alt='Hikaru absolutely disgusted' />
                        <p class='modalBody font-Sen p-5'>
                            <slot name="body">Something went wrong :(</slot>
                        </p>
                        <button @click="this.closeModal" class='modalDismiss'>I literally don't care</button>

                        <ShareButtons v-if="this.category === 'success'" />

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
    /* width: 90%; */
    padding: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
}


.modalDismiss:hover {
    background-color: #95bb4a;
    cursor: pointer;
}

.modalTitle {
    font-size: 3rem;
    margin-bottom: 1rem;
    /* padding: 1rem; */
}

.modalImage {
    margin: auto;
    border-radius: 5px;
    max-height: 15rem;
    object-fit: cover;
}

.closeIcon {
    height: 1.2rem;
    margin: 1rem;
    display: inline-block;
    fill: rgb(34, 34, 34);
    z-index: 1;
    position: relative;
}

.closeIcon:hover {
    cursor: pointer;

}

.modalBody {
    /* font-family: Arial, Helvetica, sans-serif; */
    font-size: 1.5rem;
    margin: 0.5rem;
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
        max-height: 9rem;
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