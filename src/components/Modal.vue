<template>
    <div v-if="this.modalOpen">
        <div @click="this.toggleModal" class='backdrop'>
                <!-- on click close -->
                <div class='modal' @click.stop>
                    <!-- <GrClose @click="handleClose" class='closeIcon' /> get close icon -->
                    <div class='modalContent'>
                        <h1 class='modalTitle'>Oops...</h1>
                        <img class='modalImage' src={HikaruDisgusted} alt='Hikaru absolutely disgusted' />
                        <p class='modalBody'>{{ this.text }}</p>
                        <button @click="this.toggleModal" class='modalDismiss'>I literally don't care</button>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
export default {

    props: ['text'],
    emits: ['close-modal'],
    data() {
        return {
            modalOpen: true
        }
    },
    methods: {
        toggleModal() {
            this.modalOpen = !this.modalOpen;
        }
    }

}
</script>

<style scoped>
.modal {
    border-radius: 10px;
    backdrop-filter: blur(50px);
    background-color: rgb(255, 255, 255);
    min-height: 30rem;
    width: 25rem;
    padding: 2rem;
    z-index: 30;
}

.modalContent {
    /* padding: 0.5rem; */
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
    margin: 1rem;
    border-radius: 5px;
}

.closeIcon {
    position: absolute;
    top: 25px;
    right: 25px;
    font-size: 2rem;
}

.closeIcon:hover {
    cursor: pointer;
}

.modalBody {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    font-style: italic;
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