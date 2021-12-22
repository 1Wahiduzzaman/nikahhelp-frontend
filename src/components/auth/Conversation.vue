<template>
     <div class="conversation section-padding">
      <div class="container">
         <div class="panel">
            <h2 class="text-center color-white" style="font-size: 45px"> Four step to your first conversation</h2>
            <div class="iconLine">
               <span class="alignImageLine">
                  <img src="@/assets/Icons/form.svg" alt="Icon" id="firstStepImageLine">
                  <img src="@/assets/Icons/tick 1.svg" alt="Icon" id="firstStepImageLine" class="imageTick">
                  <img src="@/assets/Icons/search.svg" alt="Icon" id="firstStepImageLine" class="imageSearch">
                  <img src="@/assets/Icons/connected.svg" alt="Icon"  id="firstStepImageLine" class="imageConn">
               </span>
            </div>
               
            <div class="row">
               <div class="col-12 col-sm-6 col-xl-3 mb-3">
                  <div class="item">
                     <img class="static-img" src="@/assets/Icons/form.svg" alt="Icon">
                     <span>Complete your profile information & submit</span>
                  </div>
               </div>
               <div class="col-12 col-sm-6 col-xl-3 mb-3">
                  <div class="item">
                     <img class="static-img" src="@/assets/Icons/tick 1.svg" alt="Icon" >
                     <span>Your ID is checked and verified by human expertise</span>
                  </div>
               </div>
               <div class="col-12 col-sm-6 col-xl-3 mb-3">
                  <div class="item">
                     <img class="static-img" src="@/assets/Icons/search.svg" alt="Icon">
                     <span>Find suitable matches and request to connect with teams</span>
                  </div>
               </div>
               <div class="col-12 col-sm-6 col-xl-3 mb-3">
                  <div class="item last">
                     <img class="static-img" src="@/assets/Icons/connected.svg" alt="Icon">
                     <span>Once connected, communicate & find out more</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
  name: "Conversation",
  components: {},
};
</script>
<style scoped lang="scss">
@import '@/styles/base/_variables.scss';

.static-img {
   width: 30px;
   margin-bottom: 10px;

   @media (min-width: 1199px) {
      display: none;
        
   }
}

.conversation{
    .panel{
       h2{
          margin-bottom:40px;
       }
       padding: 50px;
        .step-line{
            width: 80%;
            margin: 20px auto;
            display: block;
            @media(max-width: 991px){
               display: none;
            }
        }
        .item{
            position: relative;
            color: $color-white;
            text-align: center;
            padding: 20px;
            height: calc(100% - 15px);
            @media(max-width: 991px){
                   border: 1px solid $border-white;
                   margin-bottom: 15px;
            }
            span {
               display: inline-block;
               margin-top: 15px;
            }
            &::after{
                position: absolute;
                content: "";
                height: 80px;
                width: 1px;
                background: $bg-white;
                right: -13px;
                @media(max-width: 991px){
                   display: none;
                }
            }
            &.last::after{
                display: none;
            }
        }
    }
}

#firstStepImageLine
{
     height: 30px;
     
}
.panel {
   background-color: #7e80c2;
}
.alignImageLine
{
  position: absolute;
  margin-top: -15px;
  margin-left: -2px;
  margin-right: -10px;
  box-sizing: border-box;

   @media (max-width: 1199px) {
      display: none;
        
   } 
  
  
}

.iconLine {
  position: relative;
  height: 1px;
  background-color: #ddd;
  border: 1px solid #ddd;
  margin: 0 110px 0 100px;
  box-sizing: border-box;

   @media (max-width: 1199px) {
      display: none;
        
   } 
  
  
}

.imageTick {
   padding-right: 220px;
   padding-left: 245px;
   z-index: 1;
}

.imageSearch {
   z-index: 1;
   padding-right: 215px;

}

.imageConn {
   z-index: 1;
   margin-right: -10px;
   padding-right: -10px;
   box-sizing: border-box;
}

</style>