<template>
  <div>
    <template>
      
        <v-sheet
          class="mx-auto"
          :color="isDark ? '#121212' : 'white' "
        >

          <v-slide-group
            multiple
            :show-arrows="windowWidth > 533"

          >

            <v-slide-item
              v-for="(product) in products.data" :key="product.id"
              class="ma-1"
            >
            <!-- Product Card -->
            <v-card
                
                max-height="390"
                max-width="300"
                >
                <v-img
                style="cursor:pointer"
                    height="200"
                    @click="dialog = !dialog; getProductById(product.id)"
                    :src="product.image_url"
                contain></v-img>

                <v-card-title style="font-size: 16px; cursor:pointer"
                @click="dialog = !dialog; getProductById(product.id)"
                >
                {{ product.title.substring(0,60) + '...'}}
                </v-card-title>

                <v-card-text>
                <v-row
                align="center"
                class="mx-0"
                >
                <v-rating
                    :value="product.rating"
                    color="yellow"
                    dense
                    half-increments
                    readonly
                    size="14"
                ></v-rating>

                <div class="grey--text ms-4">
                   {{ product.rating}}
                </div>
                </v-row>

                <div class="my-4 text-subtitle-1">
                 <v-chip v-for="(type, i) in product.types" :key="i"
                 outlined
                 rounded
                 small
                 >
                     {{type}}
                 </v-chip>
                </div>

                <div class="d-flex justify-space-between">
                    <v-chip color="red" dark>% {{product.discount.toFixed(2)}}</v-chip>
                    <h1>${{product.now_price}}</h1>

                </div>
            </v-card-text>
            </v-card>
              

            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </template>
      <product-dialog v-model="dialog" @close="updateDialog"
      :title="TheProduct.title"
      :rating="TheProduct.rating"
      :type="TheProduct.types[0]"
      :newPrice="TheProduct.now_price"
      :oldPrice="TheProduct.last_price"
      :discount="TheProduct.discount"
      :image="TheProduct.image_url"
      :directLink="TheProduct.direct_link"
      :limitString="100"/>
  </div>
</template>

<script>
import productDialog from "@/components/Cards/ProductPopWindow.vue"
export default {
    props:['products'],
    data: () => ({
        dialog: false,
        TheProduct: [],
        windowWidth: null
    }),

    methods: {
      updateDialog(value){
        this.dialog = value
      },
      getProductById(ProductId){

        let result = this.Products.filter( (item) => {
          return item.id === ProductId
            
        })
        this.TheProduct = result[0]
      },
      onResize(e) {
          this.windowWidth = window.innerWidth;
          this.windowHeight = window.innerHeight;
      },
     
      
    },
    computed:{
       
      isDark(){
        return this.$vuetify.theme.dark
      },
      Products(){
        let result = []
        let Products = this.$store.getters.getSpiceficEcommerce
        for (let index = 0; index < Products.length; index++) {
          let data =  Products[index].data
          for (let i = 0; i < data.length; i++) {
            result.push(data[i])
            
          }
          
        }
        this.TheProduct = result[0]
        return result
      }
    },
    components:{
        productDialog
    },
    created(){
      this.Products
      this.onResize()
      window.addEventListener("resize", this.onResize);
    },
    destroyed() {
        window.removeEventListener("resize", this.onResize);
    },
    
    

}
</script>

<style>

</style>