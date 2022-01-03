<template>
    <v-card class="p-3">
        <p class="text-h6 text--secondary">More about me</p>
        <div>
            <FieldsetCard
                class="mt-3"
                title="Marital Status"
            />
            <FieldsetCard
                class="mt-3"
                title="Currently Living with"
            />
            <FieldsetCard
                class="mt-3"
                title="Willing to Relocate"
            />
            <FieldsetCard
                class="mt-3"
                title="Smoker"
            />
            <FieldsetCard
                class="mt-3"
                title="Language(s) I Speak"
            />
            <FieldsetCard
                class="mt-3"
                title="My Hobbies & Interest"
            />
            <FieldsetCard
                class="mt-3"
                title="Foods I Like"
            />
            <FieldsetCard
                class="mt-3"
                title="Things I Enjoy"
            />
            <FieldsetCard
                class="mt-3"
                title="I'm Thankfull for"
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
