
import Vue from 'vue'
import Vuex from 'vuex'  
Vue.use(Vuex) 
//创建实例对象
const store = new Vuex.Store({

    state:{
        token:'',
    },
    mutations:{

    set_token(state, token) {
        state.token  = token
        
    },
    set_userlevel(state, userlevel) {
        state.userlevel  = userlevel
    },

   },

    actions:{
        addtoken(context,token){

        console.log(token)
            
        context.commit('set_token',token)
        

               
        },
        adduserlevel(context,userlevel){
                console.log(userlevel)
                console.log('userlevel')
            context.commit('set_userlevel',userlevel)
            
    
                   
            },
        
    }


})
//挂载Vue实例上
export  default store