<template>
    <div id="app" v-loading.fullscreen.lock="loading">
        <router-view />
    </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { staticResource } from '@/api'

export default {
    computed: {
        ...mapState({
            loading: state => state.loading,
            tokenId: state => state.token.tokenId
        })
    },
    mounted() {
        if (this.tokenId) {
            this.getBasePath()
        }
    },
    methods: {
        async getBasePath() {
            Vue.prototype.$static = await staticResource.getBasePath()
        }
    },
    watch: {
        tokenId: function(newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                this.getBasePath()
            }
        }
    }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Microsoft YaHei;
}
html,
body {
    width: 100%;
    height: 100%;
    min-width: 1280px;
    min-height: 720px;
}
#app {
    width: 100%;
    height: 100%;
}
::-webkit-scrollbar {
    width: 4px;
    background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #ccc;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
</style>
