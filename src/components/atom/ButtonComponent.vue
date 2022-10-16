<template>
    <div :style="{width: wrapperWidth}" @click="$emit('onClickButton', {event: customEvent, index: index, id: typeId})">
        <v-btn
            :class="[responsive ? 'd-none d-md-block' : '']"
            class="v-custom"
            :style="{   
                background: backgroundColor,
                color: titleColor
            }"
            :loading="loading"
            :block="isBlock"
            :disabled="isDisabled"
            outlined
            :small="isSmall"
            rounded
            
        >
            <div class="flex justify-center align-center">
                <img 
                    :style="{height: iconHeight, marginRight: '10px'}" 
                    :src="icon" 
                    alt=""
                >
                <span :style="{}">{{title}}</span>
                
            </div>
        </v-btn>
        <v-btn
            :class="[responsive ? 'd-block d-md-none' : 'd-none']"
            class="v-custom-m"
            :loading="loading"
            :block="isBlock"
            :disabled="isDisabled"
            outlined
            rounded
            @click.stop="$emit('onClickButton', {event: customEvent, index: index, id: typeId})"
        >
            <div class="flex justify-center align-center">
                <img 
                    :style="{height: iconHeight}" 
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
        },
        responsive: {
            default: true
        },
        isSmall: {
            default: false
        },
        wrapperWidth: {
            default: ''
        },
        backgroundColor: {
            default: ''
        },
        titleColor: {
            default: '#6158a7'
        },
        isDisabled: {
            default: false
        }
    }
}
</script>

<style scoped lang="scss">
.v-custom{
    text-transform: capitalize;
    &:hover {
        box-shadow: 0px 1px 6px #787474;
        border: 1px solid white !important;
        background: #6158a7;
        color: #fff !important;
        img {
          filter: brightness(0) invert(1);
        }
    }
}
.v-custom-m{
    border:'1px solid #6158a7';
    &:hover {
        text-transform: 'capitalize';
        border:'1px solid #6158a7';
        box-shadow: 0px 1px 6px #787474;
        border: 1px solid white !important;
        background: #6158a7;
        color: #fff;
    }
}
</style>
