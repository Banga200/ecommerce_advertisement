<template>
 
       <v-dialog
        v-model="dialog"
        width="470"
        >
        
       <v-card
            min-height="300"
            max-width="470"
            style="position: relative;">
            <!-- close Popwindow Button  -->
            <v-btn
            color="primary"
            fab
            x-small
            dark
            absolute
            style="top: 1%; right: 1%; z-index: 999;"
            @click="dialog = !dialog">
                <v-icon>
                    mdi-window-close 
                </v-icon>  
            </v-btn>

          <v-img :src="image" width="430" height="250" contain/>
            <v-divider/>
        <v-card-title :style="{'font-size': windowWidth <= 533 ?  14 +'px' : 18 + 'px'}">{{title}}</v-card-title>
        <v-card-text>
                <v-row
                align="center"
                class="mx-0"
                >
                <v-rating
                    :value="rating"
                    color="yellow"
                    dense
                    half-increments
                    readonly
                    size="14"
                ></v-rating>

                <div class="grey--text ms-4">
                   {{rating}}
                </div>
                </v-row>

                <div class="my-4 text-subtitle-1">
                 <v-chip
                 outlined
                 rounded
                 small
                 >
                    {{type}}
                 </v-chip>
                </div>
                <div class="d-flex justify-space-between">
                    <v-chip color="red" dark>% {{discount.toFixed(2)}}</v-chip>
                    <div class="d-flex">
                        <del class="mr-5 mt-2" style="font-size:16px">${{oldPrice}}</del>
                        <h2>${{newPrice}}</h2>
                    </div>

                </div>

                <v-btn
                class="d-flex mt-10"
                :href="directLink"
                target="_blank"
                x-large
                color="primary">
                    More Details
                </v-btn>

                <div></div>
            </v-card-text>
      </v-card>
    </v-dialog>
     

</template>

<script>
export default {
    props:["value","title","image","rating","newPrice","oldPrice","directLink","discount","type",'limitString'],
    data: () => ({
        windowWidth: window.innerWidth
    
    }),
    methods:{
        changeDialogState(value){
            this.$emit("update-dialog", value);
        },
        onResize(e) {
            this.windowWidth = window.innerWidth;
        },
    },
    computed:{
        dialog:{
            get () { return this.value},
            set (value) {this.$emit("close", value)}
        }
    },
    created(){
        window.addEventListener("resize", this.onResize);
    },
    destroyed() {
        window.removeEventListener("resize", this.onResize);
    },
        
}
</script>

<style>

</style>