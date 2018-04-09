<template>
<div :class="$style.root">
    <header :class="$style.head">
        <div :class="$style.wrap">
            <u-logo :class="$style.left"></u-logo><span :class="$style.title">full stack demo</span>
        </div>
    </header>
    <u-grid-layout>
        <u-grid-layout-row :repeat="8">
            <u-grid-layout-column :span="2"></u-grid-layout-column>
            <u-grid-layout-column :span="4">
                <main :class="$style.body">
                    <router-view></router-view>
                </main>
            </u-grid-layout-column>
            <u-grid-layout-column :span="2"></u-grid-layout-column>
        </u-grid-layout-row>
    </u-grid-layout>
</div>
</template>

<script>
export default {
    data(){
        return {
        }
    },

};
</script>

<style module>
.head {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 68px;
    background: $brand-primary;
    color: white;
    box-shadow: 0 3px 4px rgba(0,0,0,0.1);
    padding: 0 10px;
    z-index: 1;
}

.wrap {
    width: 1180px;
    margin: 0 auto;
}
.title{
    color: #fff;
    height: 64px;
    line-height: 64px;
    font-size: 24px;
}

.left {
    float: left;
}

.body {
    margin-top: 100px;
}
</style>
