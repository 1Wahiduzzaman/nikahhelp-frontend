<template>
    <!-- <div> -->
        <v-card :style="{height: height}" class="p-3">
            <p class="text--secondary text-subtitle-1">{{ title }}</p>
            <p class="text--primary text-subtitle-2">
                {{ detail }}
            </p>
        </v-card>
    <!-- </div> -->
</template>

<script>
export default {
    name: 'CardInfo',
    props: {
        title: {
            default : 'A little bit about me'
        },
        detail: {
            default : ''
        },
        height: {
            default: '100%'
        }
    }
}
</script>
