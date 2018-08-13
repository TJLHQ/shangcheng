import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);
let store= new Vuex.Store({
  state:{
    carPanelData:[],
    orderBy:{},
    goods:[],
    ball:{
      el:null,
      show:false,
      img:''
    },
    showCar:false,
    maxOff:false,
    receiveInfo: [
      {
        'name': '王某某',
        'phone': '13811111111',
        'areaCode': '010',
        'landLine': '64627856',
        'provinceId': 110000,
        'province': '北京市',
        'cityId': 110100,
        'city': '市辖区',
        'countyId': 110106,
        'county': '海淀区',
        'add': '上地十街辉煌国际西6号楼319室',
        'default': true,
        'checked':true
      },
      {
        'name': '李某某',
        'phone': '13811111111',
        'areaCode': '010',
        'landLine': '64627856',
        'provinceId': 110000,
        'province': '北京市',
        'cityId': 110100,
        'city': '市辖区',
        'countyId': 110106,
        'county': '海淀区',
        'add': '上地十街辉煌国际东6号楼350室',
        'default': false,
        'checked':false
      }],
    orderData:[],
    checkGoods:[]
  },
  actions:{
    init({commit}){
      axios.get('/api/itemsData').then(res=>{
        if(res.data.erron==0){
          commit('good',res.data.data)
        }
      })
    }
  },
  mutations:{
    good(state,data){
      state.goods=data
    },
    add(state,data){
      let boo=true;
      state.carPanelData.forEach(item=>{
        if(item.sku_id==data[0].sku_id){
          item.count+=data[1]
          if(item.count>item.limit_num){
            state.maxOff=true;
            item.count=item.limit_num
            boo=false
            return
          }
          state.showCar=true;
          state.ball.el=event.path[0];
          state.ball.show=true;
          state.ball.img=data[0].ali_image
          boo=false
        }
      })
      if(boo){
        let goods=data[0]
        Vue.set(goods,'count',data[1]);
        Vue.set(goods,'checked',true);
        state.carPanelData.push(goods)
        state.showCar=true;
        state.ball.el=event.path[0];
        state.ball.show=true;
        state.ball.img=data[0].ali_image
      }
    },
    dele(state,id){
      state.carPanelData.forEach((item,index)=>{
        if(item.sku_id==id){
          state.carPanelData.splice(index,1)
        }
      })
    },
    carShow(state){
      state.showCar=true
    },
    carHide(state){
      state.showCar=false;
    },
    orderBy(state,data){
      state.orderBy=data
    },
    submitReceive (state,data) {
      if(data[0].default){
        state.receiveInfo.forEach((receive,index) => {
          receive.default = false
          receive.checked = false
        })
      }
      if(data[1]==null){
        state.receiveInfo.push(data[0])
      }else{
        console.log(data[0])
        state.receiveInfo[data[1]] = data[0]
      }
    },
    submitOrder(state,data){
      let i=state.carPanelData.length;
      while(i--){
        state.carPanelData.forEach((item,index)=>{
          if(item.checked){
            state.carPanelData.splice(index,1)
          }
        })
      }
      state.orderData.unshift(data);
      state.receiveInfo.forEach((receive) => {
        receive.checked = receive.default
      })
    },
    addClick(state,id){
      state.carPanelData.forEach(item=>{
        if(item.sku_id==id){
          if(item.count>=item.limit_num) return
          item.count++
        }
      })
    },
    defauClick(state,id){
      state.carPanelData.forEach(item=>{
        if(item.sku_id==id){
          if(item.count==1) return
          item.count--
        }
      })
    },
    allCheck(state,isChecked){
      state.carPanelData.forEach(item=>{
        if(isChecked){
          item.checked=false
        }else{
          item.checked=true
        }
      })
    },
    onlyCheck(state,id){
      state.carPanelData.forEach(item=>{
        if(item.sku_id==id){
          item.checked=!item.checked
        }
      })
    },
    checkGoods(state){
      state.carPanelData.forEach((item,index)=>{
        if(item.checked){
          state.checkGoods.push(item)
        }
      })
    },
    allDele(state){
      let i=state.carPanelData.length;
      while(i--){
        if(state.carPanelData[i].checked){
          state.carPanelData.splice(i,1)
        }
      }
    }
  },
  getters:{
    totalCount(state){
      let total=0;
      state.carPanelData.forEach(item=>{
        total+=item.count
      })
      return total
    },
    checkCount(state){
      let count=0;
      state.carPanelData.forEach(item=>{
        if(item.checked){
          count+=item.count
        }
      })
      return count
    },
    checkPrice(state){
      let price=0;
      state.carPanelData.forEach(item=>{
        if(item.checked){
          price+=item.count*item.price
        }
      })
      return price
    },
    priceCount(state){
      let total=0;
      state.carPanelData.forEach(item=>{
        total+=item.count*item.price
      })
      return total
    },
    isChecked(state){
      let checked=true;
      state.carPanelData.forEach(item=>{
        if(!item.checked){
          checked=false
        }
      })
      return checked
    }
  }

})
export default store
