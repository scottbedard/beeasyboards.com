<template>
    <div class="grid padded">
        <div class="cell mobile-12 large-phone-6">
            <label for="name" class="form-label">Name</label>
            <input
                class="form-control"
                id="name"
                placeholder="Full name"
                ref="name"
                type="text"
                required
                v-model="name"
                @input="onChange">
        </div>
        <div class="cell mobile-12 large-phone-6">
            <label for="email" class="form-label">Email</label>
            <input
                class="form-control"
                id="email"
                placeholder="Email address"
                type="email"
                required
                v-model="email"
                @input="onChange">
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            this.setUserData();
        },
        data() {
            return {
                email: '',
                name: '',
            };
        },
        methods: {
            focus() {
                this.$refs.name.focus();
            },
            onChange() {
                this.$emit('change', {
                    name: this.name,
                    email: this.email,
                });
            },
            setUserData() {
                let { user } = this.$store.state.user;

                if (user) {
                    this.name = user.name;
                    this.email = user.email;
                    this.onChange();
                }
            },
        },
    };
</script>
