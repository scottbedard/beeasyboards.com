<style lang="scss" scoped>@import 'core';
    @keyframes rotating {
        from { transform: rotate(0deg) }
        to { transform: rotate(360deg) }
    }

    div {
        display: inline-block;
    }

    svg {
        animation: rotating 750ms linear infinite;
    }
</style>

<template>
    <div>
        <svg
            enable-background="new 134 73 41 41"
            version="1.1"
            viewBox="134 73 41 41"
            x="0px"
            xml:space="preserve"
            xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            y="0px"
            :height="size"
            :width="size">
        <path
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            :stroke-width="thickness"
            :stroke="color"
            d="M142.114,105.059
        	c-4.002-4.376-5.601-10.721-3.64-16.765c1.318-4.052,4.011-7.271,7.39-9.312">
        </svg>
    </div>
</template>

<script>
    export default {
        props: {
            color: { type: String, default: '#333' },
            size: { type: String, default: '40px' },
            thickness: { type: Number, default: 5.25 },
        },
    };
</script>
