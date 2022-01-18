<template>
    <button
            :style="{
                width: width
            }"
            class="navigate"
            @click="onClick"
        >
            <div class="navigate-name">
                <img :src="icon" alt="">
                {{name}}
            </div>
        </button>
</template>

<script>
export default {
    name: 'OutlinedButton',
    methods: {
        onClick() {
            this.$emit(this.customEvent)
        }
    },
    props: {
        name: {
            type: String
        },
        icon: {
            type: String
        },
        customEvent: {
            type: String
        },
        width: {
            default: '150px'
        }
    }
}
</script>


<style scoped lang="scss">
.navigate + .navigate {
    margin-left: 8px;
}
.navigate {
    border: 1px solid #6158a7;
    font-size: 12px;
    height: 27px;
    padding: 4px 5px;
    border-radius: 5px;
    transition: .5s;
    &:hover .navigate-name {
        color: white;
    }
    &:hover {
        box-shadow: 0px 1px 6px #787474;
        border: 1px solid white;
        background: #6158a7;
    }
    .navigate-name{
        color: #6158a7;
    }
    img {
        height: 13px;
    }
}
</style>