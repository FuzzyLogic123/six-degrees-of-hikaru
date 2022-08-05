<template>
    <div>
        <Backdrop @click="$emit('close-modal')">
            <!-- on click close -->
            <div class='modal' @click.stop>
                <!-- <GrClose @click="handleClose" class='closeIcon' /> get close icon -->
                <div class='modalContent'>
                    <h1 class='modalTitle'>Oops...</h1>
                    <img class='modalImage' src={HikaruDisgusted} alt='Hikaru absolutely disgusted' />
                    <p class='modalBody'>{{ this.text }}</p>
                    <button @click="$emit('close-modal')" class='modalDismiss'>I literally don't care</button>
                </div>
            </div>
        </Backdrop>
    </div>
</template>

<script>
import Backdrop from './Backdrop.vue'
export default {

    props: ['text'],
    emits: ['close-modal'],
    components : {
        Backdrop
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
    z-index: 59;
    cursor: cell;
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