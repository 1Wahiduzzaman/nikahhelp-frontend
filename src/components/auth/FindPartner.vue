<template>
  <div class="find-partner section-padding position-relative">
      <div class="container">
         <h2 class="color-primary text-center mb-4">Find the right marrige partner with</h2>
         <div class="panel brb-0">
            <h2 class="text-center color-white mb-0">Matrimony Assist</h2>
         </div>

         <div class="card-facility-wrapper">
            <div class="wrapper-border">
               <div class="card-facility-border"></div>
               <div class="card-facility rounded">
                  <ul class="facility-list">
                     <li class="item"><img src="@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"> <span>Verified Candidate IDs</span></li>
                     <li class="item"><img src="@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"><span>Benefit from their collective
                        wisdom & experience</span></li>
                     <li class="item"><img src= "@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"><span>Make the right decision with
                        the wide-ranging information</span></li>
                     <li class="item"><img src="@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"><span>By registering let them know
                        the conversation can begin</span></li>
                     <li class="item"><img src="@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"><span>Facility to involve family and
                        friend</span></li>
                     <li class="item"><img src="@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"><span>Avoid romance scams</span></li>
                  </ul>
               </div>
            </div>
         </div>
         <div class="panel brt-0 d-flex flex-column justify-content-between flex-md-row align-items-center">
            <h3 class="text-center color-white mb-md-1" id="search-begin" >Let your companion search begin</h3>
            <button class="btn btn-round btn-parter-search" id="startBtn" onclick="location.href = '/signup';">Start here</button>
         </div>
      </div>

    <img src="@/assets/icon/bg_layer_1.svg" alt="bg" class="position-absolute bg-layer-1" />
    <img src="@/assets/icon/bg_layer_1_1.svg" alt="bg" class="position-absolute bg-layer-1-1" />
    <img src="@/assets/icon/bg_layer_2.svg" alt="bg" class="position-absolute bg-layer-2" />
    <img src="@/assets/icon/bg_layer_2_1.svg" alt="bg" class="position-absolute bg-layer-2-1" />
   </div>
</template>

<script>
export default {
  name: "FindPartner",
  components: {},
};
</script>
<style scoped lang="scss">
@import '@/styles/base/_variables.scss';
.find-partner{
    .card-facility-wrapper{
       position: relative;
        padding: 100px 0;
        @media(max-width: 991px){
            padding: 40px 0;
       }
        
        background: url('~@/assets/Bottom image.jpg') no-repeat center center;
        .wrapper-border {
           position: relative;
           max-width: 400px;
           margin: 0 auto;
            .card-facility-border{
               position: absolute;
               content: "";
               background: transparent;
               left: 15px;
               top: -22px;
               bottom: -25px;
               right: -20px;
               border: 1px solid $border-primary;
               border-radius: 10px;
               transform: rotate(5deg);
               @media(max-width: 991px){
                  display: none;
               }
            }

            .card-facility{
               background: #ffffffd9;
               box-shadow: 0 0 5px #ddd;
               padding: 35px;
               position: relative;
               z-index: 1;
               .item{
                  display: flex;
                  align-items: center;
                  margin-bottom: 15px;
                  img{
                     margin-right: 8px;
                  }
                 span {
                   opacity: 0.7;
                 }
               }
            }
         }
      }
   }

   .panel {
      background-color: #7e80c2;
   }

   #search-begin {
      font-family: "Rochester", cursive;
      font-weight: normal;
      font-size: 35px;
      box-sizing: border-box;
      letter-spacing: 2px;
      
      
   }

   #startBtn {
      font-family: "Rochester", cursive;
      font-size: 25px ;
      padding: 0px 30px 0px 30px;
      text-align: center;
      font-weight: bold;
      box-sizing: border-box;
      letter-spacing: 2px;
      border-color:  #7e80c2;
      color:  #7e80c2;
   }

   #checkIcon {
      height: 25px;
   }
.bg-layer-1 {
  bottom: 400px;
  right: 30px;
  width: 7%;
}
.bg-layer-1-1 {
  bottom: 400px;
  right: 32px;
  width: 7%;
}
.bg-layer-2 {
  top: 80px;
  left: 70px;
  width: 7%;
}
.bg-layer-2-1 {
  top: 80px;
  left: 70px;
  width: 7%;
}
</style>