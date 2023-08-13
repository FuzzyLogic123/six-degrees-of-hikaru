<script>
import { debounce } from '../../utils/debounce.js';
import { getUsernameAutoComplete } from '@/api/usernameAutoComplete'
import DropdownItem from './DropdownItem.vue';
export default {
    props: ['username', 'showDropdown'],
    data() {
        return {
            getChessAutoCompleteDebounce: null,
            autofillOptions: [],
            loadedImages: 0
        };
    },
    mounted() {
        this.getChessAutoCompleteDebounce = debounce(this.getAutofillOptions, 1000);
    },
    watch: {
        async username() {
            if (this.username.length === 0) {
                return;
            }
            this.autofillOptions = []
            this.getChessAutoCompleteDebounce(this.username);
        },
        showDropdown() {
            if (!this.showDropdown) {
                this.loadedImages = 0;
            }
        },
        loadedImages() {
            // console.log("loaded imgae")
            console.log(this.loadedImages)
            console.log(this.autofillOptions.length)
        }
    },
    methods: {
        async getAutofillOptions(username) {
            const res = await getUsernameAutoComplete(username);
            if (res) {
                this.loadedImages = 0;
                this.autofillOptions = res.member.slice();
            }
        }
    },
    components: { DropdownItem }
}
</script>

<template>
    <div v-if="this.autofillOptions.length > 0 && this.username.length > 0 && this.showDropdown" class="mt-1"
        v-show="this.loadedImages >= this.autofillOptions.length">
        <ul class="bg-slate-900 border-2 border-slate-800 shadow-md rounded-md">
            <li v-for="autofillItem in this.autofillOptions" :key="autofillItem.title"
                @click="this.$emit('select-option', autofillItem)"
                class="px-4 py-2 cursor-pointer hover:bg-slate-800 text-white">
                <DropdownItem :autofillItem="autofillItem" @imageLoaded="this.loadedImages++" />
            </li>
        </ul>
    </div>
</template>