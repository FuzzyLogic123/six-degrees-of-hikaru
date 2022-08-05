<template>
    <div class='backdrop'>
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
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
</style>