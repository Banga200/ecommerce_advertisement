<template>
    <v-alert
        dense
        outlined
        type="error"
        >
        {{ errorMessage }}
    </v-alert>
</template>

<script>
export default {
    computed: 
    {
        errorMessage()
        {
            return this.$store.getters.errorMessage;
        }
    }
   

}
</script>

<style>

</style>