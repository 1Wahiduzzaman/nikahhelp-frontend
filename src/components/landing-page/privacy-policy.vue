<template>
  <div>
    <LandingPageHeader />
    <div class="main-content">
      <h3>Privacy and cookie policy</h3>
      <p>Last updated: 07/01/2022</p>

      <h5>Who are we?</h5>
      
      <P>Matrimony Assist (hereinafter "matrimonyassist.com" or "us" or "we" as the context requires) is operated by HMS Global Business Limited, a private limited company, registered in the UK (Reg No 07212488). We are a leading online service company. </P>
    <h5>This Policy</h5>
    <p>This Privacy and Cookie Policy governs your access to and use of any matrimonyassist.com website, applications, widgets, tools or other materials operated or otherwise provided by matrimonyassist.com (the " matrimonyassist.com Services"). The matrimonyassist.com  is committed to protecting and respecting your privacy and we make it our highest priority to safeguard the confidentiality of any and all personal details you provide to us. As a visitor to or user of the matrimonyassist.com services you have the right to know and understand our information privacy practices prior to providing us with any of your personal details.</p>
    <p>This document explains our Privacy and Cookie Policy. This policy (together with our Terms and Condition of Services and any other applicable terms and conditions or documents referred to therein) sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed by us.</p>
    <p>Please read the following carefully to understand our views and practices regarding your personal data and how we will treat it.</p>
    <h5>Consent</h5>
    <p>By using the matrimonyassist.com services, you consent to (i) the collection and use of your IP Details (as defined below), Personal Information (as defined below) and location data; and (ii) the use of Cookies, in accordance with this policy. If we change our privacy and cookie policy at any time, these changes will be reflected in this policy.</p>
    <h5>Cookies</h5>
    <P>Just like other websites, our sites use cookies and similar technologies such as web beacons, pixel tags, google tag manager and flash objects. These allow our websites to work correctly, and helps us understand web traffic and how our sites are used so we can improve visitors experience, personalise services and tailor ads.</P>
    <h5>What is a cookie?</h5>
    <p>A cookie is a small text file that may be placed on your device when you visit our sites. When you next visit our websites, the cookie allows us to distinguish your device from other users’ devices.</p>
    <h5>Why do we use cookies?</h5>
    <p>
        <ul style="list-style-type: disc">
          <li>To allow our websites to work and help keep them safe and secure e.g. to load images and to allow you to log in securely.</li>
          <li>To improve the performance of our websites by helping us analyse how they are used and understand which parts work well, and which don't.</li>
          <li>To improve visitors experience on our websites, for example we use cookies to remember the products you’ve put in your basket, make personalised recommendations and to personalise your experience.</li>
          <li>To deliver relevant online advertising to visitors on our websites and third party websites. These cookies are placed by us and selected third parties and enable advertisements to be presented on our and third party websites.</li>
          <li>To understand how effective our online advertising communications are.</li>
        </ul>
        </p>
            <h5>What cookies do we use?</h5>
      <p>Depending on who owns the cookie, they are classified as:</p>

      <p>
      <ol style="list-style-type: 1">
        <li><strong>First-party cookies:</strong> These are created by the website (domain) you are visiting.</li>
        <li><strong>Third-party cookies:</strong> These are created by domains other than the one you are visiting. They allow tracking across different sites to help deliver services, and also to retarget and show ads to you.</li>
        </ol>
        </p>
        <p>
 <ol style="list-style-type: 1">
      <p>Depending on the lifespan of the cookie, they are classified as:</p>
      <li><strong>Persistent cookies:</strong> Persistent cookies remain on your device over a longer period of time defined by the owner of the cookie and are deleted manually or automatically afterwards.</li>
      <li><strong>Session cookies: </strong> Session cookies remain on your device only until you close your browser, then they are automatically deleted.</li>
      </ol>
</p>
      <p>Depending on the purpose of the cookie, they are classified as:</p>
      <p>
       <ol style="list-style-type: 1"> 

 <li><strong>Essential cookies: </strong> Essential cookies are technical cookies that are required for the operation of our websites. Without these our sites can’t operate properly. Examples include, cookies that enable you to log into secure areas, allow images to load, and orders to be processed.</li>
      <li><strong>Experience cookies:</strong> Experience cookies allow our websites to:</li>
      <li><strong>First-party cookies:</strong> These are created by the website (domain) you are visiting.</li>
      
       </ol>

       </p>

    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import LandingPageHeader from "@/components/landing-page/LandingPageHeader.vue";
export default {
  name: "PrivacyPolicy",
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

</style>