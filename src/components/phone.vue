<template>
  <div  class="nav-goods-panel" v-if="isActive">
    <ul  class="nav-goods-list" @mouseout="flag">
      <!---->
      <li  class="jianguopro2">
        <a  href="//www.smartisan.com/item/1000351">
          <div  class="item-thumb">
            <!----><img  alt="" height="160" width="160" src="https://resource.smartisan.com/resource/c71ce2297b362f415f1e74d56d867aed.png?x-oss-process=image/resize,w_160/format,webp"> </div>
          <div  class="item-name">坚果 Pro 2</div>
          <!---->
          <!---->
          <div  class="item-price">¥ 1,799.00 起</div>
          <!---->
        </a>
      </li>
      <li  class="jianguopro">
        <a  href="//www.smartisan.com/item/1000273">
          <div  class="item-thumb">
            <!----><img  alt="" height="160" width="160" src="https://resource.smartisan.com/resource/b68b71f1f97490fa8694a97057abd813.png?x-oss-process=image/resize,w_160/format,webp"> </div>
          <div  class="item-name">坚果 Pro</div>
          <!---->
          <!---->
          <div  class="item-price">¥ 1,299.00 起</div>
          <!---->
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    props:{
        isActive:{
            type:Boolean,
          default:false
        }
    },
    methods:{
      flag(){
          this.$emit('close')
      }
    }
  }
</script>

<style>
  .nav-goods-panel{
    height: 350px;
    position: relative;
    overflow: hidden;
    background: #E7E7E7;
  }
  .active .nav-goods-panel{
    height: 350px;
    position: relative;
    overflow: hidden;
    background: #E7E7E7;
    opacity: 1;

  }
  .nav-goods-list{
    visibility: visible;
    opacity: 1;
    width: 100%;
    height: 270px;
    padding-top: 52px;
    text-align: center;
    z-index: -100;
  }
  .nav-goods-list li{


    position: relative;
    display: inline-block;
    vertical-align: top;

    height: 260px;
    font-size: 14px;
  }
</style>
