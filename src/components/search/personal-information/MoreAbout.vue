<template>
    <v-card class="p-3">
        <p class="text-h6 text--secondary">More about me</p>
        <div>
            <FieldsetCard
                class="mt-3"
                v-for="n in 10"
                :key="n"
            />
        </div>
    </v-card>
</template>

<script>
import FieldsetCard from '@/components/atom/FieldsetCard'
export default {
    name:'MoreAbout',
    components: {
        FieldsetCard
    }
}
</script>
