<template>
        <div class="find-partner section-padding">
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
                     <li class="item"><img src="@/assets/Icons/tick 2.svg" alt="icon" id = "checkIcon"> Verified Candidate IDs</li>
                     <li class="item"><img src="@/assets/Icons/tick 2.svg" alt="icon" id = "checkIcon">Benefit from their collective
                        wisdom & experience</li>
                     <li class="item"><img src= "@/assets/Icons/tick 2.svg" alt="icon" id = "checkIcon">Make the right decision with
                        the wide-ranging information</li>
                     <li class="item"><img src="@/assets/Icons/tick 2.svg" alt="icon" id = "checkIcon">By registering let them know
                        the conversation can begin</li>
                     <li class="item"><img src="@/assets/Icons/tick 2.svg" alt="icon" id = "checkIcon">Facility to involve family and
                        friend</li>
                     <li class="item"><img src="@/assets/Icons/tick 2.svg" alt="icon" id = "checkIcon">Avoid romance scams</li>
                  </ul>
               </div>
            </div>
         </div>
         <div class="panel brt-0 d-flex flex-column justify-content-between flex-md-row align-items-center">
            <h3 class="text-center color-white mb-md-1" id="search-begin" >Let your companion search begin</h3>
            <button class="btn btn-round btn-parter-search" id="startBtn" onclick="location.href = '/signup';">Start here</button>
         </div>
      </div>
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
                  opacity: 0.7;
                  img{
                     margin-right: 8px;
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
</style>