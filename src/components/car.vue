<template>
  <div id="main" class="hander-car">
    <div class="store-content">
      <div class="cart-box">
        <div class="title">
          <h2>购物清单</h2>
        </div>
        <div class="cart-inner">
          <div class="empty-label" v-if="count<=0">
            <h3>您的购物车中还没有商品</h3>
            <router-link to="/" class="link">现在选购</router-link>
          </div>
          <div>
            <div class="cart-table-title">
              <span class="name">商品信息</span>
              <span class="operation">操作</span>
              <span class="subtotal">小计</span>
              <span class="num">数量</span>
              <span class="price">单价</span>
            </div>
            <div class="cart-table">
              <div class="cart-group">
                <!--购物列表-->
                <div class="cart-top-items" v-for="(item,index) in carPanelData"  :key="index">
                  <div class="cart-items">
                    <div class="items-choose">
                      <span class="blue-checkbox-new" :class="{'checkbox-on':item.checked}"  @click="onlyCheck(item.sku_id)"><a></a></span>
                    </div>
                    <div class="items-thumb">
                      <img :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'">
                      <a href="javascript:;" target="_blank"></a>
                    </div>
                    <div class="name hide-row">
                      <div class="name-table">
                        <a href="javascript:;" target="_blank">{{item.title}}</a>
                        <ul class="attribute">
                          <li>{{item.spec_json.show_name}}</li>
                        </ul>
                      </div>
                    </div>
                    <div class="operation">
                      <a class="items-delete-btn" @click="dele(item.sku_id)"></a>
                    </div>
                    <div class="subtotal">¥{{item.price*item.count}} .00</div>
                    <div class="item-cols-num">
                      <div class="select js-select-quantity">
                        <span class="down" @click="defauClick(item.sku_id)">-</span>
                        <span class="num">{{item.count}}</span>
                        <span class="up" @click="addClick(item.sku_id)">+</span>

                      </div>
                    </div>
                    <div class="price">¥{{item.price}}.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-bottom-bg fix-bottom">
          <div class="cart-bar-operation">
            <div>
              <div class="choose-all js-choose-all" @click="allCheck(isChecked)">
                <span class="blue-checkbox-new" :class="{'checkbox-on':isChecked}"><a></a></span> 全选
              </div>
              <div class="delete-choose-goods" @click="allDele">删除选中的商品</div>
            </div>
          </div>
          <div class="shipping">
            <div class="shipping-box">
              <div class="shipping-total shipping-num">
                <h4 class="">
                  已选择 <i>{{checkCount}}</i> 件商品
                </h4>
                <h5>
                  共计 <i >{{count}}</i> 件商品
                </h5>
              </div>
              <div class="shipping-total shipping-price">
                <h4 class="">
                  应付总额：<span>￥</span><i >{{checkPrice}}</i>
                </h4>
                <h5 class="shipping-tips">
                  应付总额不含运费
                </h5>
              </div>
            </div>
            <span class="jianguo-blue-main-btn big-main-btn js-checkout"><a>现在结算</a></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    computed:{
      carPanelData(){
        return this.$store.state.carPanelData
      },
      count(){
        return this.$store.getters.totalCount
      },
      isChecked(){
        return this.$store.getters.isChecked
      },
      checkCount(){
        return this.$store.getters.checkCount
      },
      checkPrice(){
        return this.$store.getters.checkPrice
      },
    },
    data(){
      return{
        goods:1
      }
    },
    methods:{
      addClick(id){
        this.$store.commit('addClick',id)
      },
      defauClick(id){
        this.$store.commit('defauClick',id)
      },
      dele(id){
        this.$store.commit('dele',id)
      },
      allCheck(isChecked){
        this.$store.commit('allCheck',isChecked)
      },
      onlyCheck(id){
        console.log('22')
        this.$store.commit('onlyCheck',id)
      },
      allDele(){
        console.log('33344')
        this.$store.commit('allDele')
      }
    }
  }
</script>
<style>
  .cart-box{
    position: relative;
    margin-top: 40px;
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0,0,0,.14);
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
  }
  .cart-box .title{
    position: relative;
    z-index: 10;
    height: 60px;
    padding: 0 10px 0 30px;
    border-bottom: 1px solid #d4d4d4;
    border-radius: 8px 8px 0 0;
    box-shadow: rgba(0,0,0,.06) 0 1px 7px;
    background: #f3f3f3;
    background: linear-gradient(#fbfbfb,#ececec);
    line-height: 60px;
    font-size: 18px;
    color: #333;
  }
  .cart-box .cart-inner{
    padding-bottom: 91px;
  }
  .cart-box .empty-label{
    height: 49px;
    padding: 385px 0 0 0;
    background: url(../assets/img/cart-box-empty.png) no-repeat center 50px;
    text-align: center;
  }
  .cart-box .empty-label h3{
    font-size: 14px;
    line-height: 1.5;
    color: #8d8d8d;
    margin-bottom: 17px;
  }
  .cart-box .empty-label>a.link{
    width: 151px;
    line-height: 38px;
    height: 38px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    display: inline-block;
    color: #999;
    font-size: 12px;
    background: #f9f9f9;
    background: -webkit-linear-gradient(#fff,#f0f0f0);
    background: linear-gradient(#fff,#f0f0f0);
  }
  .cart-box .cart-table-title{
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 30px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0,0,0,.08);
  }
  .cart-box .cart-table-title span {
    float: right;
    text-align: center;
  }
  .cart-box .cart-table-title .name{
    float: left;
    text-align: left;
  }
  .cart-box .cart-table-title .operation,
  .cart-box .cart-table-title .num,
  .cart-box .cart-table-title .price,
  .cart-box .cart-table-title .subtotal{
    width: 137px;
  }
  .cart-box .cart-table-title .subtotal{
    text-align: right;
  }
  .cart-box .cart-group{
    position: relative;
  }
  .cart-box .cart-group .cart-items{
    border-top: 1px dashed #eee;
    position: relative;
    height: 140px;
    margin-left: 74px;
  }
  .cart-box .cart-group .cart-top-items:first-child .cart-items{
    border-top: none;
  }
  .cart-box .cart-items .items-choose, .cart-items .items-thumb, .cart-items .name{
    float: left;
  }
  .cart-box .cart-items .items-choose{
    position: absolute;
    left: -74px;
    top: 0;
    width: 74px;
    height: 20px;
    padding: 60px 0 0 31px;
    font-size: 12px;
    color: #999;
  }
  .cart-box .blue-checkbox-new{
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    background: url(../assets/img/checkbox-new.png) no-repeat 0 -20px;
    cursor: pointer;
    vertical-align: middle;
  }
  .cart-box .checkbox-on{
    background: url(../assets/img/checkbox-new.png) no-repeat 0 0;
  }
  .cart-box .cart-items .items-thumb{
    position: relative;
    margin-top: 30px;
    overflow: hidden;
  }
  .cart-box .cart-items .items-thumb, .cart-items .items-thumb img{
    width: 80px;
    height: 80px;
  }
  .cart-box .cart-items .items-thumb>a, .cart-items .items-thumb>i{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 3px;
    border: 0 solid rgba(255,255,255,.1);
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.06);
  }
  .cart-box .cart-items .name{
    width: 380px;
    margin-left: 20px;
    color: #323232;
    display: table;
  }
  .hide-row{
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .cart-items .name-table{
    display: table-cell;
    vertical-align: middle;
    height: 140px;
  }
  .cart-items .name a{
    color: #333;
    font-size: 16px;
  }
  .cart-items .name .attribute, .cart-items .name p{
    color: #999;
    font-size: 12px;
    padding-top: 4px;
    line-height: 17px;
  }
  .hander-car .cart-items .name .attribute li{
    float: left;
    padding: 0 10px;
    position: relative;
  }
  .hander-car .cart-items .name .attribute li:first-child{
    padding-left: 0;
  }
  .hander-car .cart-items .item-cols-num,
  .hander-car .cart-items .operation,
  .hander-car .cart-items .price,
  .hander-car .cart-items .subtotal{
    overflow: hidden;
    float: right;
    width: 137px;
    text-align: center;
    color: #666;
    line-height: 140px;
  }
  .hander-car .cart-items .operation{
    padding: 58px 0 0;
    font-size: 12px;
    line-height: 24px;
  }
  .hander-car .cart-items .operation .items-delete-btn{
    display: block;
    width: 24px;
    height: 24px;
    margin: 0 auto;
    color: #C2C2C2;
    background: url(../assets/img/delete-btn-icon.jpg);
    background-size: 100% auto;
    transition: none;
  }
  .cart-items .operation .items-delete-btn:hover{
    background-position: 0 -36px;
  }
  .cart-items .subtotal{
    font-weight: 700;
    text-align: right;
  }
  .cart-items .item-cols-num{
    padding-top: 50px;
    line-height: 40px;
  }
  .cart-items .select{
    width: 112px;
    height: 40px;
    padding-top: 4px;
    margin: 0 auto;
    line-height: 40px;
  }
  .select .down, .select .up{
    overflow: hidden;
    float: left;
    display: inline-block;
    width: 34px;
    height: 37px;
    margin-right: 5px;
    background: url(../assets/img/cart-updown.jpg) no-repeat;
    background-image: url(../assets/img/cart-updown.jpg);
    background-size: 100% auto;
    line-height: 40px;
    text-indent: -9999em;
    cursor: pointer;
    user-select: none;
  }
  .select .down{
    background-position: 0 -60px;
  }
  .select .down:hover{
    background-position: 0 -180px;
  }
  .select .down.down-disabled, .select .down.down-disabled:hover{
    background-position: 0 -300px;
    cursor: not-allowed;
  }
  .select .num{
    position: relative;
    overflow: hidden;
    float: left;
    display: inline-block;
    width: 36px;
    height: 18px;
    margin: 7px 0 0;
    border: none;
    border-radius: 3px;
    line-height: 18px;
    text-align: center;
    font-size: 14px;
  }
  .select input{
    width: 36px;
    height: 18px;
    background-color: transparent;
    border: none;
    border-radius: 3px;
    text-align: center;
    line-height: 18px;
    font-size: 14px;
    padding: 0;
  }
  .select ul{
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 36px;
  }
  .select ul li{
    width: 36px;
    height: 18px;
  }
  .select .up{
    float: right;
    margin: 0;
    background-position: 0 0;
  }
  .select .up:hover{
    background-position: 0 -120px;
  }
  .select .up.up-disabled, .select .up.up-disabled:hover{
    background-position: 0 -240px;
    cursor: not-allowed;
  }
  .gray-box .cart-bottom-bg{
    /*height: 80px;
      background: url(../img/store/library/cart-wrapper-bg.jpg) repeat-x;
      border-top: 1px solid #D9D9D9;*/
    border-radius: 0 0 8px 8px;
  }
  .fix-bottom{
    height: 90px;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 1;
    background-position: center;
    background: #fdfdfd;
    background: linear-gradient(#fdfdfd,#f9f9f9);
    border-top: 1px solid #e9e9e9;
    box-shadow: 0 -3px 8px rgba(0,0,0,.04);
  }
  .cart-bar-operation{
    float: left;
    padding: 35px 26px;
    font-size: 12px;
  }
  .choose-all, .delete-choose-goods, .selected-count{
    float: left;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    position: relative;
  }
  .delete-choose-goods{
    position: relative;
    margin-left: 21px;
    color: #bbb;
  }
  .delete-choose-goods-disabled{
    cursor: not-allowed;
  }
  .shipping{
    display: inline-block;
    float: right;
    padding: 20px 30px;
  }
  .shipping-box{
    display: inline-block;
    padding-top: 1px;
    margin-right: 10px;
  }
  .shipping-total{
    display: inline-block;
    border-left: 1px solid #e1e1e1;
    padding: 0 20px;
  }
  .shipping-total:first-child{
    border: none;
  }
  .shipping-total.shipping-num{
    text-align: right;
  }
  .shipping-total h4{
    color: #323232;
  }
  .shipping-total h4 i{
    font-size: 18px;
    font-weight: 700;
  }
  .shipping-total.shipping-num i{
    width: 28px;
    display: inline-block;
    text-align: center;
  }
  .shipping-total h4.highlight i, .shipping-total h4.highlight span{
    color: #d44d44;
  }
  .shipping-total h5{
    color: #959595;
  }
  .shipping-total h5 i{
    width: 28px;
    display: inline-block;
    text-align: center;
  }
  .shipping-total{
    display: inline-block;
    border-left: 1px solid #e1e1e1;
    padding: 0 20px;
  }
  .shipping-total.shipping-price{
    width: 155px;
    padding-right: 0;
  }
  .blue-main-btn, .gray-main-btn, .jianguo-blue-main-btn{
    display: block;
    padding: 1px;
    margin: 0 auto;
    border-radius: 9px;
    background: #015e94;
    background: linear-gradient(#5598c9,#2a6da2);
    text-align: center;
    text-shadow: rgba(255,255,255,.496094) 0 1px 0;
    cursor: pointer;
    user-select: none;
  }
  .jianguo-blue-main-btn{
    background: #567CE6;
    background: linear-gradient(#799CEA,#567CE6);
    box-shadow: 0 1px 3px rgba(0,0,0,.1), inset 0 -1px 2px rgba(0,0,0,.2);
  }
  .cart-box .big-main-btn{
    height: 48px;
  }
  .cart-box .big-main-btn{
    float: right;
    background: #5d86e5;
    background: -webkit-linear-gradient(#688fe8,#5079e1);
    background: linear-gradient(#688fe8,#5079e1);
  }
  .cart-box .big-main-btn.jianguo-blue-main-btn.disabled-btn{
    background: #A9A9A9;
    background: linear-gradient(#BFBFBF,#999);
    box-shadow: none;
  }
  .cart-box .blue-main-btn a, .gray-main-btn a, .jianguo-blue-main-btn a{
    display: block;
    padding: 2px 0;
    border-radius: 9px;
    background: #5f7ed7;
    background: linear-gradient(#739fe1,#5f7ed7);
    box-shadow: inset 0 1px 3px #92b6ec, inset 0 0 2px #627dca, inset 0 -2px 3px #4c69b8;
    text-shadow: #4f70b3 0 -1px 0;
    cursor: pointer;
    color: #fff;
    transition: all .3s ease;
  }
  .cart-box .jianguo-blue-main-btn a{
    background: #6C94F3;
    background: linear-gradient(#7EA3F5,#5A82F0);
    box-shadow: none;
    text-shadow: none;
    color: #FFF;
    transition: all .3s ease;
  }
  .cart-box .big-main-btn a{
    height: 44px;
    line-height: 45px;
    font-size: 18px;
  }
  .cart-box .big-main-btn a{
    padding: 2px 32px;
    font-size: 16px;
  }
  .jianguo-blue-main-btn.disabled-btn a,
  .jianguo-blue-main-btn.disabled-btn:active a,
  .jianguo-blue-main-btn.disabled-btn:hover a{
    background: #B7B7B7;
    background: linear-gradient(#C3C3C3,#ABAAAA);
    box-shadow: inset 0 1px 3px #CCC;
  }
  .disabled-btn, .disabled-btn a{
    opacity: .7;
    cursor: not-allowed;
  }
</style>
