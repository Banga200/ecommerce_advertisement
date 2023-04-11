<template>
  <div>
      <v-container class="mt-3">
      <v-row class="justify-center">
          <v-col cols="10" sm="8">
              <v-autocomplete
                @focus="SearchFocus()"
                :label="$t('Searchlabel')"
                solo
                :search-input.sync="searchInput"
                :items="autocomplete"
                v-model="filters.search"
                color="white"
                id="#top"
                @keyup.enter="filterSearch()"
                :loading="isloading"
            >
            <template v-slot:no-data>
                <v-list-item>
                <v-list-item-title>
                   {{autocomplete.length == 0 ? $t("DropdownPlaceholder"): $t("noData") }}
                </v-list-item-title>
                </v-list-item>
            </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="2" sm="3" md="2" lg="1">
            <v-btn
            color="primary"
            @click="filterSearch()"
            :small="windowWidth <= 533"
            :large="windowWidth >= 533"
            :fab="windowWidth <= 533">
            {{windowWidth <= 533 ? '' : $t('Search')}}
            <v-icon :right="windowWidth >= 533">mdi-magnify</v-icon>
          </v-btn>
          </v-col>
      </v-row>
      
  </v-container>
  <v-container fluid class="mt-10  mb-10">
          <v-row class="justify-center">
              <!-- Filters -->

              <v-col cols="12" sm="10" md="3" lg="3" style="border:0.5px sold" >

                    <h3>{{$t("SearchFilter")}} <v-icon>mdi-filter</v-icon></h3>
                      <v-expansion-panels class="mt-1">
                     <v-expansion-panel>
                         <v-expansion-panel-header>{{$t("Filters.ecommercesSites")}}</v-expansion-panel-header>
                         <v-expansion-panel-content>
                            <div class="mb-10">
                                <v-row class="justify-center mt-0">
                                    <v-col   v-for="(ecommerce, i) in ecommerces" :key="i">
                                        
                                        <v-checkbox
                                        :label="ecommerce"
                                        color="primary"
                                        @change="filterSearch()"
                                        v-model="filters.ecommerces"
                                        :value="ecommerce"
                                        hide-details
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </div>
                         </v-expansion-panel-content>
                     </v-expansion-panel>   
                </v-expansion-panels> 

                    <!-- Categories Filter -->
                    <v-expansion-panels
                        
                        multiple
                        class="mt-1 mb-1">
                        <v-expansion-panel>
                            <v-expansion-panel-header>{{ $t("Filters.Category")}}</v-expansion-panel-header>
                            <v-expansion-panel-content >
                                <div class="Scrollable_Div mt-5 mb-5">
                                       <v-row class="justify-space-around align-center " v-for="(type, i) in types" :key="i">
                                        <v-col cols="8" class="py-1">
                                            <p class="mb-1">{{type.name}}</p>
                                        </v-col>
                                         <v-col cols="4" class="py-1">
                                            <v-checkbox
                                                v-model="filters.categories"
                                                :value="type.name"
                                                @change="filterSearch()"
                                                color="primary accent-4"
                                                ></v-checkbox>
                                         </v-col>
                                       </v-row> 
                                </div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                     
                    <!-- Categories filter -->
                    
                 <v-expansion-panels>
                     <v-expansion-panel>
                         <v-expansion-panel-header>{{$t("Filters.Price")}}</v-expansion-panel-header>
                         <v-expansion-panel-content>
                             <div>
                                <v-row>
                                    <v-subheader class="mt-8 pa-2">{{$t("Filters.Lowest")}}</v-subheader>
                                    <v-slider
                                    class="mt-11"
                                    thumb-color="primary"
                                    min="0"
                                    @change="filterSearch()"
                                    v-model="filters.priceValue"
                                    max="2000"
                                    thumb-label="always"
                                ></v-slider>
                                <v-subheader class="mt-8 pa-2">{{$t("Filters.Highest")}}</v-subheader>

                                </v-row>
                            </div>
                         </v-expansion-panel-content>
                     </v-expansion-panel>
                </v-expansion-panels>   
                <v-container class="mt-3 mb-2">
                </v-container>
                
                
              </v-col>
              <!-- Products -->

              <!-- loading   -->
                <v-col cols="12" md="8" lg="9" v-if="loading">
                    <v-row>
                        <v-col class="ma-0 pa-0" cols="6" sm="4" md="4" lg="3" xl="2" v-for="(n, i) in 20" :key="i"
                            >
                          <loading/>
                        </v-col>
                    </v-row>
                </v-col>
                <!-- Error -->
                <v-col cols="8" class="align-center" v-if="error">
                    <error/>
                </v-col>

                <!-- Content -->
                <v-col cols="12"  md="9" lg="9" v-if="!loading">
                  <v-row>
                      <v-col class="pa-0 ma-0" cols="6" sm="4" md="4" lg="3" xl="2" v-for="(product, index) in Products" :key="index">
                           <v-card
                            class="mx-1 ma-0 my-1"
                            max-height="390"
                            max-width="300"
                            elevation="1"
                            >
                            <v-img
                            style="cursor:pointer"
                            :height="windowWidth <= 533 ? 150 : 200"
                            @click="dialog = !dialog; getProductById(product.id)"
                            :src="product.image_url"
                            contain></v-img>

                            <v-card-title :style="{'font-size': windowWidth <= 533 ?  12 +'px' : 15 + 'px', 'cursor': 'pointer'} "
                            @click="dialog = !dialog; getProductById(product.id)"
                            >
                            {{ product.title.substring(0,40) + '...'}}
                            </v-card-title>

                            <v-card-text class="pa-2 pa-sm-3 pt-0">
                            <v-row
                            align="center"
                            class="mx-0 justify-space-around d-flex"
                            >
                            <div class="d-flex">
                                <v-rating
                                :value="product.rating"
                                color="yellow"
                                dense
                                half-increments
                                readonly
                                :size="windowWidth < 533 ? 6 : 12"
                                ></v-rating>

                                <div class="grey--text ms-1 mr-1">
                                    {{ product.rating}}
                                </div>
                            </div>
                            <v-img
                                class="ma-0 mb-0"
                                outlined
                                 width="16"
                                height="16"
                                contain
                                :small="windowWidth >533"
                                :x-small="windowWidth < 533"
                                color="blue darken-4"
                                v-if="product.e_commerce == 'Ebay'"
                                :src="marketLogo[1]"/>
                            <v-img
                                class="ma-0 mb-0"
                                outlined
                                 width="16"
                                height="16"
                                contain
                                :small="windowWidth >533"
                                :x-small="windowWidth < 533"
                                color="blue darken-4"
                                v-if="product.e_commerce == 'Amazon'"
                                :src="marketLogo[0]"/>
                            <v-img
                                class="ma-0 mb-0"
                                outlined
                                width="16"
                                height="16"
                                contain
                                :small="windowWidth >533"
                                :x-small="windowWidth < 533"
                                color="blue darken-4"
                                v-if="product.e_commerce == 'AliExpress'"
                                :src="marketLogo[2]"/>
                            </v-row>

                            <div class="my-3 text-subtitle-1">
                            <v-chip v-for="(type, i) in product.types" :key="i"
                            outlined
                            rounded
                            :small="windowWidth >533"
                            :x-small="windowWidth < 533">
                                {{type}}
                            </v-chip>
                            </div>

                            <div class="d-flex justify-space-between">
                                <v-chip :small="windowWidth > 425" :x-small="windowWidth < 425" color="red" dark>% {{product.discount.toFixed(2)}}</v-chip>

                                <!-- price -->
                                <h1 :style="{'font-size': windowWidth <= 533 ?  20 +'px' : 26 + 'px','font-size': windowWidth <= 425 ?  16 +'px' : 26 + 'px',}">${{product.now_price}}</h1>

                            </div>
                            </v-card-text>
                        </v-card>
                      </v-col>
                  </v-row>
              </v-col>
          </v-row> 
    </v-container>
    <v-row class="justify-center mt-10 mb-10">
        <v-col cols="10" class="text-center">
            <v-pagination
                v-model="page"
                :length="pages"
                :total-visible="windowWidth <= 533 ? 7 : 12"
                circle
                ></v-pagination>
        </v-col>
    </v-row>
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
import loading from "@/components/loading/frameloadingProducts.vue"
import error from "@/components/messages/errorMessage.vue"
import axios from "axios"
export default {
    
    data: () => ({
        windowWidth: window.innerWidth,
        filterTitles: ["Cat"],
        dialog: false,
        ticksLabels:[
            'Lowest',
            'Highest'
        ],
        autocomplete: [],
        isloading: false,
        ecommerces: ["Amazon","Ebay", "AliExpress"],
        TheProduct: 
        {
            direct_link: "",
            discount: 5,
            e_commerce: "",
            image_url: "",
            last_price: "",
            now_price: "",
            rating: "",
            title: "",
            types: [""],
        },
        marketLogo: 
        [ 
            require("@/assets/images/Amazon.png"),
            require("@/assets/images/ebay.png"),
            require("@/assets/images/Aliexpress.png"),
        ],
        filters: 
        {
            ecommerces:[],
            search: "",
            categories: [],
            priceValue: 0,
        },
        searchInput: "",
        page: 1,

        
    }),
    watch:
    {
        page(newPage) {
            this.GetProductByPage(newPage)
            window.scrollTo(0,0);
  
        },
        // searchInput(newvalue){
        //     this.searchInput = newvalue;
        //     // this.$store.commit("setSearch",this.searchInput)
        // }
    },
    methods: {
        updateDialog(value){
            this.dialog = value
        },
       async SearchFocus(){
            if(!this.$store.getters.productsNames){
                this.isloading = true
                 await this.$store.dispatch("getProductsNames")
                 let names = this.$store.getters.productsNames
                const result = names.map(title => {
                    return title.title
                })
                this.autocomplete = result
                this.isloading = false
            }
        },
        async filterSearch(){
            this.$store.state.searchInput = this.searchInput
            let params = {
                ecommerce: this.filters.ecommerces.length == 0 ? "" : [...this.filters.ecommerces].join(','),
                name: this.searchInput,
                price: this.filters.priceValue == 0 ? "": this.filters.priceValue,
                type: this.filters.categories.length == 0 ? "" : [...this.filters.categories].join(',')
             }
            this.$store.dispatch("getProductsByFilter", params)
            this.page = 1
            this.searchInput = this.$store.state.searchInput
        },
        getProductById(ProductId){
            let result = this.Products.filter( (item) => {
            return item.id === ProductId
                
            })
            
            this.TheProduct = result[0]
        },
        GetProductByPage(newPage){
            if (this.$store.state.searchInput == "" && this.filters.categories.length == 0 &&
                this.filters.ecommerces.length == 0 && this.filters.priceValue == 0) {
                this.$store.dispatch("getAllProducts",newPage) 
            }
            else{
                let params = {
                ecommerce: this.filters.ecommerces.length == 0 ? "" : [...this.filters.ecommerces].join(','),
                name: this.$store.state.searchInput,
                price: this.filters.priceValue == 0 ? "": this.filters.priceValue,
                type: this.filters.categories.length == 0 ? "" : [...this.filters.categories].join(','),
                page: this.page
             }
                this.$store.dispatch("getProductsByFilter", params)
            }
        },
        onResize(e) {
            this.windowWidth = window.innerWidth;
        },
        getPriceMinMax(){
            axios.get("http://muhammeddevxd.pythonanywhere.com/api/products_search",{
                params :{
                    price: [this.filters.priceValue, 100000].join(",")
                }
            }).then(res => {
                console.log(res)
            })
        }
    },
    computed:{
        productNames(){

        },
        Products()
        {
            return this.$store.getters.AllProducts
        },
        types(){
            return this.$store.getters.types;
        },
       
        loading(){
            return this.$store.getters.loading
        },
        pages(){
            return this.$store.getters.pages
        },
        error(){
            return this.$store.getters.errorMessage
        }
    },
    components:{
        productDialog,
        loading,
        error
    },
    async created(){
        window.scrollTo(0,0);
       window.addEventListener("resize", this.onResize);
       await this.$store.dispatch("getAllProducts",this.page)
       await this.$store.dispatch("getAllTypes");
       this.getPriceMinMax()
       this.Products 
    },
    destroyed() {
        window.removeEventListener("resize", this.onResize);
    },
}
</script>

<style>
.Scrollable_Div {
    max-height: 285px;
    width:100%;
    overflow: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
    
}
.Scrollable_Div::-webkit-scrollbar{
  width: 10px;
}
.Scrollable_Div::-webkit-scrollbar-thumb{
  background: #1976d2;
   border-radius: 1px;
}
.Scrollable_Div::-webkit-scrollbar-track
{
  background:rgb(235, 235, 235);
}
.v-expansion-panel-content__wrap{
    padding: 0px 5px 5px 5px !important;
}
</style>