<template>
<div>

 <v-container style="height: 60vh">
   <v-row class="align-center flex-column-reverse flex-sm-row">
     <!-- Hero Title -->
     <v-col cols="12" sm="6" :class="{'text-center': windowWidth <= 533}">
       <div>
         <h1>{{ $t("HeroSection.HeroText")}}</h1>
         <h2 class="mt-4">Amazon, Ebay, & AliExpress</h2>
       </div>

      
      <v-btn
      
      :class="windowWidth <= 533 ? 'mt-10':  'mt-14'"
      outlined
      href="#BorwseProduct" 
      >
       {{ $t("HeroSection.BrowseNow")}}
    
      </v-btn>
     </v-col>
     <!-- Hero Image -->
     <v-col cols="12" sm="6">
       <v-img src="@/assets/images/HeroImage.svg"  contain/>
     </v-col>
   </v-row>
 </v-container>
 <!-- Error Message -->
 

  <v-container style="text-align:center" id="BorwseProduct" :class="windowHeight <= 785 ? 'mt-14' : 'mt-5'">
     <h2 class="mb-2">{{$t("OffersOf")}}</h2>
    <v-row class="d-flex justify-center">
      <v-col col="6" sm="3" md="2" v-for="(market,i) in marketLogo" :key="i">
          <v-avatar contain color="#ffff" size="72" class="pa-2 shadow"
           >
            <v-img :src="market.src" contain width="100px" height="100px" />
          </v-avatar>
       
      </v-col>
    </v-row>
  </v-container>
  
  <v-row v-if="isLoading || ErrorMessage" class="d-flex justify-center  mb-3">
   <v-col cols="12" sm="4" class="text-center"> 
       <error v-if="ErrorMessage"/>
       
<!-- Loading Spinner -->
      <loading v-if="isLoading"/>
   </v-col>
 </v-row>
  

  <v-container fluid class="pa-0 pa-sm-3">
    
    <div v-for="(product,i) in ecommerceProducts"
    :key="i">
      <v-container class="d-flex container--fluid justify-space-between mx-1 mx-md-4 mt-5">
        <v-img  :src="product.ecommerceImage"  max-height="30" max-width="100" contain/>
        <v-btn text elevation="0" color="primary"
        to="/products"
        :small="true">
          {{$t('MoreProducts')}}
          <v-icon>{{$i18n.locale == 'en' ? 'mdi-arrow-right': 'mdi-arrow-left'}}</v-icon>

          <v-icon></v-icon>
        </v-btn>
      </v-container>
      <product-card :products="product"/>
    </div>
  </v-container>

  <v-row class="mt-5">
    <v-col class="text-center" cols="12">
        <v-btn color="primary" large outlined 
        to="/products">
          {{$t("BrowseAll")}}
          <v-icon >{{$i18n.locale == 'en' ? 'mdi-arrow-right': 'mdi-arrow-left'}}</v-icon>
          
        </v-btn>
    </v-col>
  </v-row>
</div>
</template>

<script>
import loadingProduct from "@/components/loading/frameloadingProducts.vue";
import productCard from "@/components/Cards/ProductCard.vue";
import error from "@/components/messages/errorMessage.vue"
import loading from "@/components/loading/loading.vue"
  export default {
    name: 'Home',
    data:()=> ({
      windowWidth: null,
      windowHeight: null,
      marketLogo: 
      [
          {
            name: "Amazon",
            src: require("@/assets/images/Amazon.png"),
          },
          {
            name: "Ebay",
            src: require("@/assets/images/ebay.png"),
          },
          {
            name: "AliExpress",
            src: require("@/assets/images/Aliexpress.png"),
          },
      ]
    }),
    methods:{
      onResize(e) {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
        },
      
    },
    
    computed: {

      ecommerceProducts(){
        return this.$store.getters.getSpiceficEcommerce
      },

      isDark(){
        return this.$vuetify.theme.dark
      },
      isLoading(){
        return this.$store.getters.loading;
      },
      ErrorMessage(){
        return this.$store.getters.errorMessage
      }
    },
    components:{
      loadingProduct,
      productCard,
      error,
      loading
    },
     async created(){
      this.windowWidth = window.innerWidth;
       window.addEventListener("resize", this.onResize);
       
       if(this.$store.getters.getSpiceficEcommerce.length == 0){
        for (let index = 0; index < this.marketLogo.length; index++) {
          await this.$store.dispatch("getSpiceficProduct", {
            ecommerce: this.marketLogo[index].name,
            ecommerceImage: this.marketLogo[index].src,

          })
       }
       }
       this.$store.commit("setErrorMessage", null)
    },
    destroyed() {
        window.removeEventListener("resize", this.onResize);

    },
  }
</script>

<style scoped>
.ecommerceButtonContainer
{
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  border: 1px solid ;
  border-radius: 25px;
  padding: 10px 20px;
 cursor: pointer;
}
.shadow {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2) !important;
}
</style>