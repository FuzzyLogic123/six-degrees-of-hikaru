<script>
import KingSvg from '../svg/King.vue';

export default {
    props: {
        loading: Boolean,
        username: String,
        timeControl: String,
    },
    components: {
        KingSvg,
    },
    emits: ["update:username", "update:timeControl", "startUserChainSearch"],
    data() {
        return {

        }
    },
    methods: {
        startUserChainSearch() {
            this.$refs.usernameInput.blur();
            this.$emit('startUserChainSearch');
        },
        scrollIntoView() {
            this.$refs.usernameInput.scrollIntoView();
        },
    }
}

</script>

<template>
    <div class="pt-12 pb-16 flex justify-center gap-5 w-full">
        <form class="basis-2/4 " action="#" @submit.prevent>
            <input ref="usernameInput" :value="this.username" @input="$emit('update:username', $event.target.value)"
                class="w-full inline-block ml-1 text-white p-3 rounded-md border-2 border-slate-800 bg-slate-900 xl:text-xl xs:text-lg"
                name=search spellCheck=false autocomplete=off :disabled="this.loading" type="text"
                placeholder="chess.com username" @keyup.enter="this.startUserChainSearch" />
        </form>
        <select :value="this.timeControl" @input="$emit('update:timeControl', $event.target.value)" name="time-control" :disabled="this.loading"
            class="text-slate-400 p-3 rounded-md border-2 border-slate-800 bg-slate-900 non-shiny">
            <option value=blitz>Blitz</option>
            <option value=bullet>Bullet</option>
        </select>
        <button
            class='sm:inline-block mr-1 bg-slate-900 border-slate-800 border-2 rounded-md xl:text-xl text-lg text-white hover:stroke-slate-50 stroke-slate-400 disabled:stroke-gray-500 disabled:opacity-60'
            @click="this.startUserChainSearch" :disabled="this.loading || !this.username">
            <KingSvg class="scale-75" />
        </button>
    </div>
</template>
