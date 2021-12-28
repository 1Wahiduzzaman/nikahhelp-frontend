<template>
    <v-card class="p-3">
        <table>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 160px">Name</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">Static Name</td>
            </tr>
            <tr v-for="n in value" :key="n">
                <td class="text--disabled text-subtitle-1" style="width: 50px">Current Residence</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">Bangladesh</td>
            </tr>
        </table>
    </v-card>
</template>

<script>
export default {
    name:'InformationTable',
    props: {
        value: {
            default: 9
        }
    }
}
</script>
