<template>
    <div>
        <v-btn
            class="d-none d-md-block"
            :style="{   
                textTransform: 'capitalize', 
                border:'2px solid white', 
                background: bgColor,
                color: textColor
            }"
            :loading="loading"
            :block="isBlock"
            rounded
            @click="$emit('onClickButton', {event: customEvent, index: index, id: typeId})"
        >
            <div class="flex justify-center align-center">
                <img 
                    :style="{height: iconHeight, marginRight: '10px'}" 
                    :src="icon" 
                    alt=""
                >
                {{title}}
            </div>
        </v-btn>
        <v-btn
            class="d-block d-md-none"
            :style="{   
                textTransform: 'capitalize', 
                border:'2px solid white', 
                background: bgColor,
                color: textColor
            }"
            :loading="loading"
            :block="isBlock"
            rounded
            @click="$emit('onClickButton', {event: customEvent, index: index, id: typeId})"
        >
            <div class="flex justify-center align-center">
                <img 
                    :style="{height: iconHeight, marginRight: '10px'}" 
                    :src="icon" 
                    alt=""
                >
            </div>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'ButtonComponent',
    props: {
        title: {
            default: 'Button title',
            type: String
        },
        customEvent: {
            default: 'onClick'
        },
        index: {
            default: 0
        },
        typeId: {
            default: null
        },
        bgColor: {
            default: '#6158a7'
        },
        textColor: {
            default: '#ffff'
        },
        loading: {
            default: false
        },
        icon: {
            default: ''
        },
        hoverIcon: {
            default: ''
        },
        isBlock: {
            default: true
        },
        iconHeight: {
            default: '20px'
        }
    }
}
</script>
