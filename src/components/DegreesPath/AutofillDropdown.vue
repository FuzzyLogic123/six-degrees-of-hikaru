<script>
import { debounce } from '../../utils/debounce.js';
import { fetchUsernameAutoComplete } from '@/api/fetchUsernameAutoComplete'

import DropdownItem from './DropdownItem.vue';

export default {
    props: ['username', 'showDropdown'],
    emits: ['select-option'],
    data() {
        return {
            getChessAutoCompleteDebounce: null,
            autofillOptions: [],
        };
    },
    mounted() {
        this.getChessAutoCompleteDebounce = debounce(this.getAutofillOptions, 500);
    },
    watch: {
        async username() {
            if (this.username.length === 0) {
                return;
            }
            this.autofillOptions = []
            this.getChessAutoCompleteDebounce(this.username);
        },
    },
    methods: {
        async getAutofillOptions(username) {
            if (username.length <= 2) { // chess.com username searches only work for 3+
                return;
            }
            const res = await fetchUsernameAutoComplete(username);
            if (res && res.member.length > 0) {
                this.autofillOptions = res.member;
            }
        }
    },
    components: { DropdownItem }
}
</script>

<template>
    <div v-if="this.autofillOptions.length > 0 && this.username.length > 0 && this.showDropdown" class="mt-1 z-10">
        <ul class="bg-slate-900 border-2 border-slate-800 shadow-md rounded-md">
            <li v-for="autofillItem in this.autofillOptions" :key="autofillItem.title"
                @click="this.$emit('select-option', autofillItem)" @mousedown.prevent
                class="px-4 py-2 cursor-pointer hover:bg-slate-800 text-white">
                <DropdownItem :autofillItem="autofillItem" />
            </li>
        </ul>
    </div>
</template>