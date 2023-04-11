<template>
  <v-app>
    <template>
      <div>
        <v-app-bar
          dense
          height="60"
          elevation="0"
         :class="[{dark: isDark}, {indigo: !isDark}]">
         <v-container
         class="d-flex align-center">
           <v-toolbar-title class="white--text">
            <router-link to="/">
              <v-img src="@/assets/logo.svg" contain width="80"
              height="50"
             />
            </router-link>
           </v-toolbar-title>

          <v-spacer></v-spacer>


           <v-btn
           id="modeIcon"
           elevation="0" icon
           @click="ToDarkMode()"
           v-if="!isDark"
           dark
           >
             <v-icon 
             >mdi-moon-waning-crescent</v-icon>
           </v-btn>
           <v-btn
           id="modeIcon"
           elevation="0" icon
           @click="ToLightMode()"
           v-else>
             <v-icon >mdi-white-balance-sunny</v-icon>
           </v-btn>

          <v-menu
            class="menuHover"
            open-on-hover
            bottom
            offset-y
            
            open-delay="100"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
              elevation="0"
              class="pa-0"
                v-bind="attrs"
                v-on="on"
               color="transparent"
               dark>
                <v-icon class="ma-1">mdi-translate</v-icon>
                <v-icon size="18">mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list nav dense>
              <v-list-item-group
                
                >
                <v-list-item-title class="text-center"><b>{{$t("Translation")}}</b></v-list-item-title>
                <v-list-item
                  v-for="(item,index) in items"
                  :key="index"
                  @click="changeLang(item.lang)"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ item.langName }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
              
              
            </v-list>
          </v-menu>
         </v-container>
        </v-app-bar>
      </div>
    </template>
    <v-main id="main">
      <router-view/>
    </v-main>

    <v-footer
    dark
    padless
   class="mt-10">
    <v-card
      flat
      tile
      width="100%"
      class="lighten-1 white--text text-center"
      :class="[{dark: isDark}, {indigo: !isDark}]"
    >
      <v-card-text>
        <a v-for="(icon, i) in icons" :key="i"
        :href="icon.link"
        target="_blank"
        style="text-decoration: none;">
          <v-btn
          class="mx-4 white--text"
          icon
          text
        >
          <v-icon size="24px">
            {{ icon.icon }}
          </v-icon>
        </v-btn>
        </a>
      </v-card-text>

      <v-card-text class="text-center white--text pt-0">
        <v-img src="@/assets/logo.svg" width="300"
        height="100" contain class="ma-auto"/>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
       Copyright &copy {{ new Date().getFullYear() }}  <strong>IAMY</strong>
      </v-card-text>
    </v-card>
  </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    icons: 
    [
      {link: "https://www.facebook.com/",icon: 'mdi-facebook'},
      {link: "https://twitter.com/?lang=ar",icon: 'mdi-twitter'},
      {link: "https://www.instagram.com/",icon: 'mdi-instagram'},
      
    ],
    items: 
    [
      {
        lang: "ar",
        langName: "العربية"
      },
      {
        lang: "en",
        langName: "English"
      },
    ],
    
  }),
  methods:{
   changeLang(lang)
   {
     if (lang =="ar") {
       this.$vuetify.rtl = true
       this.$i18n.locale= "ar"
     localStorage.setItem("lang",  'ar')
     } else {
       this.$vuetify.rtl = false
       this.$i18n.locale = "en"
     localStorage.setItem("lang",  'en')
     }
   },
   ToDarkMode()
   {
     this.$vuetify.theme.dark = true
     localStorage.setItem("darkTheme",  this.$vuetify.theme.dark.toString())
   },
   ToLightMode()
   {
     this.$vuetify.theme.dark = false
     localStorage.setItem("darkTheme", this.$vuetify.theme.dark.toString())
   }
    
  },
  computed:{
    isDark(){
      return this.$vuetify.theme.dark
    }
  },
  mounted() {
    const theme = localStorage.getItem("darkTheme");
    if (theme) {
        if (theme === "true") {
            this.$vuetify.theme.dark = true;
        } else {
            this.$vuetify.theme.dark = false;
        }
    }
    const lang = localStorage.getItem('lang') 
    if (lang) {
        if (lang =="ar") {
       this.$vuetify.rtl = true
       this.$i18n.locale= "ar"
     } else {
       this.$vuetify.rtl = false
       this.$i18n.locale = "en"

     }
    }
  },
  created(){
      if(!navigator.onLine) {
        this.$store.commit("setErrorMessage", "Please check Internet Connection")
      }
    
  }
};
</script>

<style >
::-webkit-scrollbar{
  width: 10px;
}
::-webkit-scrollbar-thumb{
  background: #3f51b5;
   border-radius: 1px;
}
::-webkit-scrollbar-track
{
  background:rgb(235, 235, 235);
}

.menuHover{
   transition: opacity .4s ease-in-out;
}
#modeIcon{
  transform: rotate(-20deg);
}

#main{
  min-height: calc(100vh - 48px - 205px);
}

</style>