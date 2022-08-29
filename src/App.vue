<script>
import HikaruPhoto from "./components/HikaruPhoto.vue";
import Logo from "./components/Logo.vue";
import MenuBar from "./components/MenuBar.vue";
import Testimonials from "./components/Testimonial/Testimonials.vue";
import Footer from "./components/Footer.vue";
import Modal from "./components/Modal.vue";
import TotalPathsCalculated from "./components/TotalPathsCalculated.vue";
import PathBackground from "./components/Stylistic/PathBackground.vue";
import About from "./components/Heroes/About.vue";
import SixDegrees from "./components/Heroes/SixDegrees.vue";
import Home from "./components/Heroes/Home.vue";

export default {
  components: {
    Testimonials,
    Footer,
    MenuBar,
    Logo,
    HikaruPhoto,
    Modal,
    TotalPathsCalculated,
    PathBackground,
    About,
    SixDegrees,
    Home
  },
  methods: {
    scrollToRef(refName) {
      this.$refs[refName].scrollIntoView(true);
    }
  }
}
</script>

<template>
  <div class="App" ref="home">
    <div class="p-5 lg:pt-0 lg:pb-3">
      <MenuBar @scroll-to-element="this.scrollToRef" />
    </div>

    <Home @scroll-to-element="this.scrollToRef"/>

    <div>
      <Testimonials />
    </div>

    <TotalPathsCalculated />

    <div class="relative dark-hero slanted-div w-screen bg-cover overflow-clip">
      <div ref="sixDegrees">
        <SixDegrees />
      </div>

      <div ref="about">
        <About />
      </div>

      <div class="pb-10">
        <Footer class="w-screen text-center"></Footer>
      </div>
    </div>
  </div>

</template>

<style scoped>
.App {
  background-image: url('@/assets/images/backgroundImages/background.png');
  background-size: cover;
}

.dark-hero {
  background-image: url('@/assets/images/backgroundImages/heroDark.jpg');
}
</style>
