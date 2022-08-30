<script>
import HeroHeader from '../HeroHeader.vue';
import DegreesWrapper from '../DegreesPath/DegreesWrapper.vue';

export default {
    components: {
        HeroHeader,
        DegreesWrapper,
    }
}
</script>

<template>
    <HeroHeader svg="Connection" colour="#818CF8">
        <template #main-text>
            Find your path
        </template>
        <template #secondary-text>
            See how you compare
        </template>
    </HeroHeader>

    <DegreesWrapper />
    <!-- <PathBackground class="absolute top-96 overflow-clip -z-10" /> -->

</template>