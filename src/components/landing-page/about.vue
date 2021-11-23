<template>
  <div class="about-container">
    <header>
      <div class="container">
        <a href="/"><img src="@/assets/logo.png" alt="" /></a>
        <div class="float-right auth-btn" id="logRegisterBtn">
          <a
            href="/login"
            class="btn btn-sm btn-secondary mr-2"
            id="signInButton"
          >
            Sign In
          </a>
          <a
            href="/register"
            class="btn btn-sm btn-secondary btn-brand ml-2"
            id="joinNowButton"
          >
            Join Now
          </a>
        </div>
      </div>
    </header>

    <div class="about-content">
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

export default {
  name: "PrivacyPolicy",
  components: {
    //	Header,
    Footer,
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.about-container {
  header {
    height: 100px;
    background-color: $bg-secondary;
    img {
      margin-top: 10px;
      height: 80px;
    }

    .auth-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40px;
      .btn-brand {
        background-color: $bg-brand;
      }
    }
  }
  .container {
    width: 100%;
    height: 100px;
    @media (min-width: 768px) {
      width: 80%;
    }
    @media (max-width: 768px) {
      width: 100%;
      margin: 0px;
    }
  }
  .about-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
    padding: 20px;
    background-color:rgb(248, 236, 247);
  }
}
</style>