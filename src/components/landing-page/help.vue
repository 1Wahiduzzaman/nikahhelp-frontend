<template>
  <div>
    <LandingPageHeader />

    <div class="main-content">
      <h3>About Matrimony Assist</h3>
      <p>
        Matrimony Assist is an online platform to facilitate conversation
        between families who are seeking marriage partners for their loved ones.
        In Matrimony Assist, both the candidate and the family jointly play a
        vital role to find prospects.
      </p>
      <p>
        Matrimony Assist has only one goal – that is to assist as many people as
        quick possible find compatible marriage partners.
      </p>
      <p>Our approach is easy, simple, traditional and contemporary.</p>
      <p>
        Matrimony Assist is not a dating platform. This site has been
        particularly designed for sincere candidates and their families who are
        seriously looking for companionable marriage partners. Here, we
        introduce candidate in an anonymous environment with gradual approach
        supported by our team. This allows each member to decide when and to
        whom what information to show. Here both parties get plenty of
        opportunities to decide for themselves suitable candidate based on their
        selection criteria.
      </p>
      <p>
        Starting out on a journey to find a suitable marriage companion, or for
        someone you care about (son, daughter, niece, nephew, friend, colleague,
        or anyone really) is not easy as it should be. You might be getting
        increasingly worried, frustrated, facing delays and lack of choice in
        finding someone. Matrimony Assist has been created for all of our
        extended family members who keep asking if we know someone for an
        aspiring bride and groom.
      </p>
      <p>
        Matrimony Assist is a family and friends matrimonial introduction
        service to help you navigate traditions, sensitivities, keeping true to
        your values, and finding someone who is trying to do the same. It is a
        convenient and smart way to go about companion hunting, while involving
        family and friends on a secure portal, without too much sweat and
        stress.
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
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  max-width: 1100px;
  margin: 0 auto;
     padding: 0 10px;
@media (min-width: 320px) and (max-width: 480px) {
    padding: 0 20px;
  }
}
</style>