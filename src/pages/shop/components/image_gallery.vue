<style lang="scss" scoped>@import 'core';
    .empty-message {
        color: #aaa;
        font-size: 2em;
        font-weight: 100;
        text-align: center;
        @include bp-prop(margin, 0, 0.67em 0);
        @include transition(margin);
    }

    .selected {
        margin: 0 auto;
        margin-bottom: 20px;
        max-width: 480px;

        img {
            height: auto;
            width: 100%;
        }
    }

    .preview {
        $space-between: 20px;
        text-align: center;

        a {
            display: inline-block;
            margin: 0 #{ $space-between / 2};
            @include bp-prop(max-width, 65px, 80px, 95px, 110px);
            @include transition('max-width, transform');

            &:hover {
                transform: translateY(-4px);
            }
        }

        img {
            height: auto;
            width: 100%;
        }
    }
</style>

<template>
    <div v-if="isEmpty" class="empty-message">
        Sorry homie, we haven't uploaded these images yet.
    </div>
    <div v-else>
        <div class="selected">
            <img :src="selectedImage.path" :alt="getAltText(selectedImage)">
        </div>
        <div class="preview">
            <a
                v-for="image in images"
                href="#"
                @click.prevent="onImageClicked(image)">
                <img :src="image.path" :alt="getAltText(image)">
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            if (this.images.length) {
                this.selectedImageId = this.images[0].id;
            }
        },
        data() {
            return {
                selectedImageId: null,
            };
        },
        computed: {
            isEmpty() {
                return this.product.images.length === 0;
            },
            images() {
                return this.product.images || [];
            },
            selectedImage() {
                return this.product.images.find(image => image.id === this.selectedImageId);
            },
        },
        methods: {
            getAltText(image) {
                let alt = image.title || this.product.name;

                return alt.trim().toLowerCase();
            },
            onImageClicked(image) {
                this.selectedImageId = image.id;
            },
        },
        props: [
            'product',
        ],
    };
</script>
