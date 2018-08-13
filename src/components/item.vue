<template>
  <div id="main">
    <div class="store-content item">
      <div class="item-box">
        <div class="gallery-wrapper">
          <div class="gallery">
            <div class="thumbnail">
              <ul>
                <li v-for="(img,index) in goods.ali_images" :key="index" @click="change(index)" :class="{'on':index==number}">
                  <img :src="img+'?x-oss-process=image/resize,w_54/quality,Q_90/format,webp'">
                </li>
              </ul>
            </div>
            <div class="thumb">
              <ul>
                <li class="on" ><img :src="goods.ali_images[number]+'?x-oss-process=image/resize,w_440/quality,Q_90/format,webp'"></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="banner">
          <div class="sku-custom-title">
            <div class="params-price">
              <span><em>¥</em><i>{{goods.price}}</i></span>
            </div>
            <div class="params-info">
              <h4>{{goods.title}}</h4>
              <h6>{{goods.sub_title}}</h6>
            </div>
          </div>
          <div class="sku-dynamic-params-panel">
            <div class="sku-dynamic-params clear">
              <span class="params-name">颜色</span>
              <ul class="params-colors">
                <li v-for="(item,index) in goods.sku_list" :key="index" :class="{'cur':item.id==$route.query.itemId}">
                  <router-link :to="{name:'Item',query:{itemId:item.id}}">
                    <i>
                      <img :src="'http://img01.smartisanos.cn/'+item.image+'20X20.jpg'" alt="">
                    </i>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="sku-dynamic-params clear">
              <div class="params-name">数量</div>
              <div class="params-detail clear">
                <div class="item-num js-select-quantity">
                  <span class="down" @click="defals">-</span>
                  <span class="num">{{count}}</span>
                  <span class="up" @click="addMore">+</span>
                </div>
              </div>
            </div>
          </div>
          <div class="sku-status">
            <div class="cart-operation-wrapper clearfix">
              <span class="blue-title-btn js-add-cart"><a @click="addShop">加入购物车</a></span>
              <span class="gray-title-btn"><a @click="buyShop">现在购买</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        goodsData:[],
        number:0,
        count:1
      }
    },
    computed:{
      goods(){
          if(this.$store.state.goods.length!=0){
            let goods=this.$store.state.goods.filter(item=>{
              return item.sku_id==this.$route.query.itemId
            })[0]
            return goods
          }else{
              return
          }


      }
    },
    created(){
       this.$store.dispatch('init')
    },
    methods:{
      addShop(){
        let data=[this.goods,this.count]
        this.$store.commit('add',data)
      },
      change(index){
        this.number=index
      },
      defals(){
        if(this.count==1){
          return
        }else{
          this.count--
        }
      },
      addMore(){
        if(this.count==this.goods.limit_num){
          return
        }else{
          this.count++
        }
      },
      buyShop(){
          let goodsData=this.goods;
          goodsData.count=this.count;
          let data={
              totalPrice:this.count*goodsData.price,
            total:this.count,
            item:[goodsData]
          }
          this.$store.commit('orderBy',data);
          this.$router.push('/checkout')
      }

    }
  }
</script>
<style>
  .item .item-box{
    width: 1098px;
    padding: 60px;
    margin-bottom: 20px;
    display: table;
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0,0,0,.14);
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
  }
  .banner, .gallery-wrapper{
    display: table-cell;
  }
  .gallery-wrapper{
    vertical-align: top;
  }
  .gallery{
    float: left;
    width: 540px;
    display: table-cell;
  }
  .thumb, .thumbnail{
    display: table-cell;
    vertical-align: middle;
  }
  .thumbnail li{
    width: 54px;
    height: 54px;
    margin-top: 10px;
    padding: 12px;
    border: 1px solid rgba(0,0,0,.06);
    border-radius: 5px;
    cursor: pointer;
  }
  .thumbnail li:first-child{
    margin-top: 0;
  }
  .thumbnail li.on{
    padding: 10px;
    border: 3px solid #ccc;
    border: 3px solid rgba(0,0,0,.2);
  }
  item-box img{
    max-width: 100%;
    height: auto;
  }
  .thumb>ul{
    margin-left: 20px;
    width: 440px;
    height: 440px;
    position: relative;
  }
  .thumb li{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: none;
    opacity: 0;
    text-align: center;
    user-select: none;
  }
  .thumb li.on{
    animation: thumb-change .35s ease-out 1;
    position: relative;
    display: block;
    z-index: 1;
    opacity: 1;
  }
  .item-box .banner{
    vertical-align: middle;
    width: 450px;
    margin-left: 10px;
  }
  .item-box .banner .sku-custom-title{
    overflow: hidden;
    padding: 8px 8px 18px 10px;
    position: relative;
  }
  .item-box .banner .params-price{
    position: absolute;
    right: 8px;
    bottom: 19px;
  }
  .item-box .banner .params-price span{
    display: block;
    color: #de4037;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
  }
  .item-box .banner .params-price span i{
    padding-left: 2px;
    font-size: 24px;
  }
  .item-box .banner .sku-custom-title .params-info{
    width: 360px;
  }
  .item-box .banner .sku-custom-title h4{
    font-size: 24px;
    line-height: 1.25;
    color: #000;
    margin-bottom: 13px;
  }
  .item-box .banner .sku-custom-title h6{
    font-size: 14px;
    line-height: 1.5;
    color: #bdbdbd;
  }
  .item-box .banner .sku-dynamic-params-panel{
    padding: 29px 0 8px 10px;
    border-top: 1px solid #ebebeb;
  }
  .item-box .banner .sku-dynamic-params{
    margin-bottom: 19px;
  }
  .item-box .banner .params-name{
    float: left;
    padding-right: 20px;
    font-size: 14px;
    color: #8d8d8d;
    line-height: 36px;
  }
  .item-box .banner .sku-dynamic-params .params-colors{
    float: left;
    line-height: 36px;
    margin: -10px 0 0 -10px;
    width: 402px;
  }
  .item-box .banner .sku-dynamic-params .params-colors>li{
    float: left;
    margin: 10px 0 0 10px;
  }
  .item-box .banner .sku-dynamic-params .params-colors>li a{
    display: block;
    width: 26px;
    height: 26px;
    border: 2px solid #E5E5E5;
    padding: 3px;
    text-align: center;
    color: #757575;
    border-radius: 50%;
  }
  .item-box .banner .sku-dynamic-params .params-colors>li.cur a{
    border-color: #B2B2B2;
    box-shadow: inset 0 0 0 1px #B2B2B2;
  }
  .item-box .banner .sku-dynamic-params .params-colors>li i, .item-box .banner .sku-dynamic-params .params-colors>li img{
    position: relative;
    display: block;
    width: 100%;
    border-radius: 50%;
  }
  .item-box .banner .sku-dynamic-params{
    margin-bottom: 19px;
  }
  .item-box .banner .params-detail{
    line-height: 36px;
    float: left;
    width: 392px;
  }
  .item-box .item-num{
    float: left;
    width: 128px;
  }
  .item-box .item-num .down:before, .item-box .item-num .up:before{
    content: '';
    position: absolute;
    left: -4px;
    right: -4px;
    top: 0;
    height: 45px;
    background: url(../assets/img/cart-updown-item.png) no-repeat;
    background-size: 100% auto;
  }
  .item-box .item-num .down:before{
    content: " ";
    background-position: 0 -60px;
  }
  .item-box .item-num .down:hover:before{
    content: " ";
    background-position: 0 -180px;
  }
  .item-box .item-num .down.down-disabled:before, .item-box .item-num .down.down-disabled:hover:before{
    content: " ";
    background-position: 0 -300px;
  }
  .item-box .item-num .down, .item-box .item-num .up{
    position: relative;
    float: left;
    display: inline-block;
    width: 36px;
    height: 36px;
    line-height: 40px;
    text-indent: -9999em;
    cursor: pointer;
    user-select: none;
  }
  .item-box .item-num .down.down-disabled, .item-box .item-num .up.up-disabled{
    cursor: not-allowed;
  }
  .item-box .item-num .up:before{
    background-position: 0 0;
  }
  .item-box .item-num .up:hover:before{
    background-position: 0 -120px;
  }
  .item-box .item-num .up.up-disabled:before, .item-box .item-num .up.up-disabled:hover:before{
    content: " ";
    background-position: 0 -240px;
  }
  .item-box .item-num .num{
    position: relative;
    overflow: hidden;
    float: left;
    display: inline-block;
    width: 56px;
    height: 18px;
    margin: 7px 0 0;
    border: none;
    border-radius: 3px;
    line-height: 18px;
    text-align: center;
    font-size: 14px;
  }
  .item-box .item-num input{
    width: 56px;
    height: 18px;
    background-color: transparent;
    border: none;
    border-radius: 3px;
    text-align: center;
    font-size: 14px;
    line-height: 18px;
    padding: 0;
  }
  .item-box .item-num ul{
    /*display: none;*/
    position: absolute;
    left: 0;
    top: 0;
    width: 56px;
  }
  .item-box .item-num ul li{
    width: 56px;
    height: 18px;
  }
  .item-box .sku-status{
    position: relative;
    border-top: 1px solid #ebebeb;
    padding: 30px 0 0 10px;
  }
  .item-box .blue-title-btn{
    float: left;
    display: inline-block;
    width: 143px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    border-radius: 7px;
    border: 1px solid #5c81e3;
    background-color: #5c85e5;
    background-image: linear-gradient(#779ae9,#5078df);
    color: #fff;
    cursor: pointer;
  }
  .item-box .blue-title-btn:hover{
    transition: all .15s ease-out;
    box-shadow: inset 0 1px 1px #7696DE, inset 0 0 2px #627DCA, inset 0 -2px 3px #5A77C7, inset 0 0 100px rgba(48,77,147,.4);
  }
  .item-box .blue-title-btn a, .item-box .green-title-btn a{
    color: #fff;
  }
  .item-box .cart-operation-wrapper .gray-title-btn{
    margin-left: 20px;
  }
  .item-box .gray-title-btn{
    display: inline-block;
    width: 143px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: linear-gradient(#fff,#fafafa);
    border: 1px solid #e0e0e0;
    border-radius: 7px;
    color: #8c8c8c;
    cursor: pointer;
  }
  .item-box .gray-title-btn:hover{
    transition: all .15s ease-out;
    background: linear-gradient(#f6f6f6,#ededed);
  }

</style>
