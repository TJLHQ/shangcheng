<template>
  <li @mouseover="carShow" @mouseout="carHide">
    <a href="javascript:;" class="ball-rect">购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num" :class="{'cart-num':total>0}">
			<i>{{total}}</i>
		</span>
    <div class="nav-cart-wrapper" v-show="showCar">
      <div class="nav-cart-list">
        <div class="empty" v-if="total<=0">
          <h3>购物车为空</h3>
          <p>您还没有选购任何商品，现在前往商城选购吧!</p>
        </div>
        <div class="full" v-else>
          <div class="nav-cart-items">
            <ul>
              <li class="clear" v-for="item in goodsData">
                <div class="cart-item js-cart-item cart-item-sell">
                  <div class="cart-item-inner">
                    <div class="item-thumb">
                      <img :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'">
                    </div>
                    <div class="item-desc">
                      <div class="cart-cell">
                        <h4>
                          <a href="/item">{{item.title}}</a>
                        </h4>
                        <p class="attrs">
                          <span>{{item.spec_json.show_name}}</span>
                        </p>
                        <h6>
                          <span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x{{item.count}}</span>
                        </h6>
                      </div>
                    </div>
                    <div class="del-btn" @click="dele(item.sku_id)">删除</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="nav-cart-total">
            <p>共 <strong class="ng-binding">{{total}}</strong> 件商品</p>
            <h5>合计：<span class="price-icon">¥</span><span class="price-num">{{price}}</span></h5>
            <h6>
              <router-link to="/cart" class="nav-cart-btn">去购物车</router-link>
            </h6>
          </div>
        </div>
      </div>
    </div>
    <transition
      name="ball"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
    >
      <div class="addcart-mask" v-show="ball.show">
        <img class="mask-item">
      </div>
    </transition>
  </li>
</template>
<script>
  export default{
    computed:{
      goodsData(){
        return this.$store.state.carPanelData
      },
      total(){
        return this.$store.getters.totalCount
      },
      price(){
        return this.$store.getters.priceCount
      },
      showCar(){
        return this.$store.state.showCar
      },
      ball(){
        return this.$store.state.ball
      }
    },
    methods:{
      dele(id){
        this.$store.commit('dele',id)
      },
      carShow(){
        this.$store.commit('carShow')
      },
      carHide(){
        this.$store.commit('carHide')
      },
      beforeEnter(el){
        let rect=this.ball.el.getBoundingClientRect()
        let rectEl=document.querySelector('.ball-rect').getBoundingClientRect();
        let ball=document.querySelector('.mask-item');
        let x=rectEl.left+rectEl.width/2-rect.left+rect.width/2;
        let y=rect.top+rect.height/2-rectEl.top+rectEl.height/2;
        el.style.transform=`translate3D(0,${y}px,0)`;
        ball.style.transform=`translate3D(${-x}px,0,0)`;
        ball.src=this.ball.img
        this.ball.show=true;
      },
      enter(el){
        let rf = el.offsetHeight
        let ball=document.querySelector('.mask-item');
        el.style.transform='translate3D(0,0,0)'
        ball.style.transform=`translate3D(0,0,0)`;
      },
      afterEnter(){
        this.ball.show=false;
      }
    }

  }
</script>
<style type="text/css">
  .ball-enter-active{
    transition: .5s cubic-bezier(.15,.69,.6,1.29);
  }
  .ball-enter-active .mask-item{
    transition: .5s cubic-bezier(0,0,1,1);
  }

</style>
