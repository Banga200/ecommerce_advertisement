import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '@/i18n';
import axois from "axios";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDark: false,
    Allproducts: [],
    SpiceficecommerceProduct: [],
    AmazonProduct: [],
    EbayProduct: [],
    AlibabaProduct: [],
    errorMessage: null,
    sucssessMessage: null,
    loading: null,
    PagesCount: null,
    types: null,
    searchInput: "",
    productsNames: null,
  },
  
  mutations: {
    setProducts(state,products){
      state.Allproducts = products
    },
    setSpiceficecommerceProduct(state,products){
      state.SpiceficecommerceProduct.push(products)
    },
    setErrorMessage(state,errorMSG){
      state.errorMessage = errorMSG
    },
    setSuccessMessage(state,message){
      state.sucssessMessage = message
    },
    setLoading(state,payload){
      state.loading = payload
    },
    setPageCount(state, pages)
    {
      state.PagesCount = pages
    },
    setTypes(state, types)
    {
      state.types = types
    },
    setProductsNames(state, names){
      state.productsNames = names
    }
  },
  actions: {
    // Get All Products
   async getAllProducts({ commit},pageNumber){
      commit('setLoading', true)
      commit('setErrorMessage', null)
     await axois.get("https://muhammeddevxd.pythonanywhere.com/api/products?page=" + pageNumber)
      .then((res)=> {
        commit('setLoading', null)
        commit('setProducts',res.data.results)
        commit('setPageCount',res.data.count)
      }).catch((error) => {
        commit('setLoading', null)
        commit('setErrorMessage', error.message)
      })
    },
    async getProductsByFilter({ commit},payload){
      commit('setLoading', true)
      commit('setErrorMessage', null)
     await axois.get("http://muhammeddevxd.pythonanywhere.com/api/products_search", {
        params: payload
     })
     
      .then((res)=> {
        if(res.data.count === 0){
          commit('setLoading', null)
          commit('setErrorMessage', i18n.t("errorMessage"))
          commit('setProducts', null)
          commit('setPageCount', null)
          return;
        }
        commit('setLoading', null)
        commit('setProducts',res.data.results)
        commit('setPageCount',res.data.count)
      }).catch((error) => {
        commit('setLoading', null)
        commit('setErrorMessage', error.message)
      })
    },
    // Spicefic Ecommerce Products
   async getSpiceficProduct({commit}, ecommerce){
      commit('setLoading', true)
      commit('setErrorMessage', null)
     await axois.get(`https://muhammeddevxd.pythonanywhere.com/api/ecommerce/${ecommerce.ecommerce}/products`)
      .then((res)=> {
        commit('setLoading', null)
        const result = 
        {
          ecommerce: ecommerce.ecommerce,
          ecommerceImage: ecommerce.ecommerceImage,
          data: res.data.results
        }
        commit('setSpiceficecommerceProduct',result)
      }).catch((error) => {
        commit('setLoading', null)
        commit('setErrorMessage', error.message)
      })
    },
    
    async getAllTypes ({commit}) {
      commit('setLoading', true)
      commit('setErrorMessage', null)
     await axois.get(`https://muhammeddevxd.pythonanywhere.com/api/types`)
      .then((res)=> {
        commit('setLoading', null)
        commit('setTypes',res.data)
      }).catch((error) => {
        commit('setLoading', null)
        commit('setErrorMessage', error.message)
      })
    },
    async getProductsNames ({commit}) {
      commit('setErrorMessage', null)
     await axois.get(`https://muhammeddevxd.pythonanywhere.com/api/products_name`)
      .then((res)=> {
        commit('setProductsNames',res.data)
      }).catch((error) => {
        commit('setLoading', null)
        commit('setErrorMessage', error.message)
      })
    }
  },
  getters: {
    AllProducts(state){
      return state.Allproducts;
    },
    getSpiceficEcommerce(state){
      return state.SpiceficecommerceProduct;
    },
    errorMessage(state){
      return state.errorMessage;
    },
    loading(state){
      return state.loading;
    },
    pages(state){
      return Math.floor((state.PagesCount / 20));
    },
    types(state){
      return state.types;
    },
    productsNames(state){
      return state.productsNames
    }
  },
  
})
