<template>
    <div class="flex justify-end">
        <a
            class="navigate"
            v-for="item in items"
            :key="item.link"
            :href="item.link"
        >
            <div class="navigate-name">
                {{item.name}}
                <img :src="item.icon" alt="">
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'Scroller',
    props: {
        items: {
            type: Array,
            default() {
                return [
                    {
                        link: '#family-information', 
                        name: 'Family Information',
                        icon: '/assets/icon/navigate-bottom.svg'
                    },
                    {
                        link: '#my-partner-pref', 
                        name: 'My Partner Preference',
                        icon: '/assets/icon/navigate-bottom.svg'
                    }
                ]
            } 
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