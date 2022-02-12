<template>
  <div>
    <LandingPageHeader />

    <div class="main-content">
      <br>
      <h5>Have a question? We are happy to help.</h5>
      <h3 class="text-header-black">Contact the MatrimonyAssist team</h3>
      <h5>Please use the form below to get in touch. Please provide as much detail as you can.
We aim to get back to you within two working days. However, at busy times this may take a little longer.</h5><br><br>
     

     <h4>Quick links</h4>
     <div class="flex-container">
           
  <div> <a href="#">I can't login</a>
    </div>
  <div>How do I sign up?</div>
 <div>I need help with subscription plan </div>
  <div>My account is blocked</div>
   <div>How do I invite a team member? </div>

</div>
     <br>
     <h4>Still need help? Can't find what you're looking for?</h4><br>

     <h4>SEND US AN EMAIL</h4>

<div class="container">
  <form action="action_page.php">

  <label for="query">What is your enquiry regarding?</label>
      <select id="query" name="query">
      <option value="" disabled selected>Please select </option>
      <option value="feedback">Give feedback</option>
      <option value="suggestion">Offer suggestion</option>
      <option value="complaint">Make a complaint</option>
      <option value="general">General enquiry </option>
      <option value="media">Media enquiry </option>
      <option value="commercial">Commercial enquiry </option>
      <option value="advertisement">Advertisement enquiry </option>
        <option value="technica">Technical/website enquiry   </option>
    </select>

<label for="message">Your message</label>
    <textarea id="message" name="message" placeholder="Describe the issue (max. 1000 characters)"  style="height:200px" required value="" maxLength="1000"></textarea>

   <label for="fname">What is your first name?</label>
    <input type="text" id="fname" name="firstname" placeholder="First name" required>

    <label for="lname">What is your last name?</label>
    <input type="text" id="lname" name="lastname" placeholder="Last name" required>

    <label for="telephone">What is your preferred contact telephone number? (Optional)</label>
    <input type="text" id="telephone" name="telephone" placeholder="Contact number">

<label for="email">What is your email address?</label>
    <input type="text" id="email" name="email" placeholder="Email address" required>


    <p>By clicking 'Submit' you are agreeing to our <a href="">terms & conditions</a> and <a href="">privacy and cookie policy</a>.</p>

    <input type="submit" value="Submit">

  </form>
  <br>
  <p>To <a href="">unsubscribe from our emails</a>, please follow the link and enter your email address.</p>
</div>

   </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import LandingPageHeader from "@/components/landing-page/LandingPageHeader.vue";
export default {
  name: "Help",
  components: {
    LandingPageHeader,
    Footer,
  },
};

</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  max-width: 1100px;
  margin:10px auto;
  padding: 0 10px;
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0 20px;
  }
}
//Flex container
* {
  box-sizing: border-box;
}
.flex-container {
  display: flex;
  flex-direction: row;
  font-size: 18px;
  background-color: #f1f1f1;
  padding: 20px;
  justify-content: space-between;
  

}
.flex-container > div {

  padding: 20px;
  background-color: #fffefe;
  border-radius: 6px;
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
   margin: 10px;
  }

/* Responsive layout - makes a one column-layout instead of two-column layout */
@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
}


//contact form

/* Style inputs with type="text", select elements and textareas */
input[type=text], select, textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */ 
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  font-size: 16px;
  resize: vertical; /* Allow the user to vertically resize the textarea (not horizontally) */
 
}
label {font-size: 18px;}

/* Style the submit button with a specific background color etc */
input[type=submit] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  font-size: 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
input[type=submit]:hover {
  background-color: #45a049;
}

/* Add a background color and some padding around the form */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>