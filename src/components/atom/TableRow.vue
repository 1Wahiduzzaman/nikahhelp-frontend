<template>
    <tr>
        <td class="text--disabled text-caption" :style="{width: titleWidth}">{{ title }}</td>
        <td class="text-subtitle-1" :style="{width: colonWidth}">:</td>
        <td class="text--secondary text-caption">{{ value }} </td>
    </tr>
</template>

<script>
export default {
    name: 'TableRow',
    props: {
        title: {
            type: String,
            default: 'title'
        },
        titleWidth: {
            type: String,
            default: '140px'
        },
        colonWidth: {
            type: String,
            default: '20px'
        },
        value: {
            type: String
        }
    }
}
</script>