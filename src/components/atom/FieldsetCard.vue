<template>
    <div>
        <fieldset class="">
            <legend class="text--secondary text-subtitle-2">{{ title }}</legend>
            <div class="text-center text-subtitle-1">{{ info }}</div>
        </fieldset>
    </div>
</template>

<script>
export default {
    name: 'FieldsetCard',
    props: {
        info: {
            default: 'Default Title'
        },
        title: {
            default: 'Information'
        }
    }
}
</script>

<style scoped lang="scss">
fieldset {
    border: 1px solid #d3d0e4;
    border-radius: 10px;
}
legend {
    display: inline-block;
    margin: 0 auto;
    width: inherit;
    font-size: 20px;
}
</style>
