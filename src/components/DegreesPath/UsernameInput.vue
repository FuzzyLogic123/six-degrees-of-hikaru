<script>
import KingSvg from '../svg/King.vue';
import AutofillDropdown from './AutofillDropdown.vue';

export default {
    props: {
        loading: Boolean,
        username: String,
        timeControl: String,
    },
    data() {
        return {
            showDropdown: false
        }
    },
    components: {
        KingSvg,
        AutofillDropdown
    },
    emits: ["update:username", "update:timeControl", "startUserChainSearch"],
    methods: {
        startUserChainSearch() {
            this.$refs.usernameInput.blur();
            this.$emit('startUserChainSearch');
        },
        scrollIntoView() {
            this.$refs.usernameInput.scrollIntoView();
        },
        handleClickOnDropdown(option) {
            this.$emit('update:username', option.title);
            this.showDropdown = false;
            this.startUserChainSearch();
        }
    }
}

</script>

<template>
    <div class="pt-12 pb-16 flex justify-center gap-5 w-full">

        <form class="basis-2/4 relative" action="#" @submit.prevent>
            <input ref="usernameInput" :value="this.username" @input="$emit('update:username', $event.target.value)"
                @focus="this.showDropdown = true" @blur="this.showDropdown = false"
                class="w-full inline-block text-white p-3 rounded-md border-2 border-slate-800 bg-slate-900 xl:text-xl xs:text-lg focus:outline-none focus:border-slate-300"
                name=search spellCheck=false autocomplete=off :disabled="this.loading" type="text"
                placeholder="chess.com username" @keyup.enter="this.startUserChainSearch" />
            <AutofillDropdown :username="this.username" :showDropdown="this.showDropdown" class="absolute w-full" @select-option="handleClickOnDropdown"/>
        </form>

        <select :value="this.timeControl" @input="$emit('update:timeControl', $event.target.value)" name="time-control"
            :disabled="this.loading"
            class="text-slate-400 p-3 rounded-md border-2 border-slate-800 bg-slate-900 non-shiny focus:outline-none focus:border-slate-300">
            <option value=blitz>Blitz</option>
            <option value=bullet>Bullet</option>
        </select>

        <button
            class='sm:inline-block mr-1 bg-slate-900 border-slate-800 border-2 rounded-md xl:text-xl text-lg text-white hover:stroke-slate-50 stroke-slate-400 disabled:stroke-gray-500 disabled:opacity-60 focus:outline-none focus:border-slate-300'
            @click="this.startUserChainSearch" :disabled="this.loading || !this.username">
            <KingSvg class="scale-75" />
        </button>

    </div>
</template>


<style scoped>
.non-shiny {
    -webkit-appearance: none;
}
</style>