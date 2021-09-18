<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<style lang="less">
#app {
    background: #f7f8fa;
    font-size: 14px;
    color: #2a2d33;
    min-height: 100vh;
    box-sizing: border-box;
}
</style>
