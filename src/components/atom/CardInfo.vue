<template>
    <div>
        <v-card class="p-3">
            <p class="text--secondary text-subtitle-1">{{ title }}</p>
            <p class="text--primary text-subtitle-2">
                {{ detail }}
            </p>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'CardInfo',
    props: {
        title: {
            default : 'A little bit about me'
        },
        detail: {
            default : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus expedita cum cupiditate tenetur sed illum culpa vel veniam eligendi iusto, nisi repellat accusamus ex itaque, consectetur laudantium numquam rerum at.'
        }
    }
}
</script>
