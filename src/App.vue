<script>
import FindPathButton from "./components/FindPathButton.vue";
import HeroHeader from "./components/HeroHeader.vue";
import HikaruPhoto from "./components/HikaruPhoto.vue";
import Logo from "./components/Logo.vue";
import MenuBar from "./components/MenuBar.vue";
import Testimonials from "./components/Testimonial/Testimonials.vue";
import LongArrow from "./components/svg/LongArrow.vue";
import Footer from "./components/Footer.vue";
import DegreesWrapper from './components/DegreesPath/DegreesWrapper.vue';
import Modal from "./components/Modal.vue";
import TotalPathsCalculated from "./components/TotalPathsCalculated.vue";
import PathBackground from "./components/Stylistic/PathBackground.vue";

export default {
  components: {
    Testimonials,
    HeroHeader,
    DegreesWrapper,
    Footer,
    FindPathButton,
    MenuBar,
    Logo,
    HikaruPhoto,
    LongArrow,
    Modal,
    TotalPathsCalculated,
    PathBackground
  },
  data() {
    return {

    }
  },
  methods: {
    scrollToRef(refName) {
      console.log(refName);
      console.log(this.$refs[refName]);
      this.$refs[refName].scrollIntoView(true);
    }
  }
}
</script>

<template>
  <div class="App">
    <div class="p-5 lg:pt-0 lg:pb-3">
      <MenuBar @scroll-to-element="this.scrollToRef" />
    </div>
    <div class="relative flex flex-col xl:flex-row xl:ml-28" ref="home">
      <div class="relative flex flex-col sm:gap-7 flex-1 items-center justify-start">
        <div id='home' class="scale-50 sm:scale-100 2xl:scale-[1.3] m-0 xl:m-0 2xl:p-28">
          <Logo />
        </div>
        <div class="m-5 sm:m-10 2xl:scale-150">
          <FindPathButton />
        </div>
      </div>
      <p
        class="absolute -left-36 bottom-40 font-LibreBarcode128 text-white -rotate-90 text-xl tracking-[7px] 2xl:text-4xl">
        six degrees
      </p>
      <div class="absolute -left-24 bottom-6 scale-[0.25] 2xl:scale-[0.5] 2xl:bottom-36 2xl:-left-20">
        <LongArrow class="stroke-slate-200 stroke-2 fill-white" />
      </div>
      <div class="hidden xl:flex flex-1 items-center justify-center">
        <div class="scale-50 xl:scale-100 2xl:scale-[1.5] 2xl:mt-48">
          <HikaruPhoto />
        </div>
      </div>
    </div>
    <div>
      <Testimonials />
    </div>
    <TotalPathsCalculated />


    <div class="relative dark-hero slanted-div w-screen bg-auto overflow-hidden" ref="sixDegrees">
      <HeroHeader svg="Connection" colour="#818CF8">
        <template #main-text>
          Find your path
        </template>
        <template #secondary-text>
          See how you compare
        </template>
      </HeroHeader>

      <PathBackground class="absolute top-0 overflow-hidden" />
      <DegreesWrapper />

      <div id='about' ref="about">
        <HeroHeader svg="QuestionMark" colour="#53DAA1">
          <template #main-text>
            About the website
          </template>
          <template #secondary-text>
            How it works
          </template>

        </HeroHeader>
      </div>

      <p
        class="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-7 text-center font-Sen m-10 md:m-20 xl:m-32 2xl:mx-72">
        The aim of this website is to find the quickest path from you to Grandmaster Hikaru by games won.
        <br /><br />
        Inspired by the six degrees of seperation, this website uses a database of 100 000 users, calculating the chain
        to 3 degrees with breadth first search.
        <br /><br />
        If a user is not in the database, the algorithim will then find which user is the most optimal choice moving
        forward, until it finds a user in the database.
        <br /><br />
        Thanks for visiting and enjoying the website.
        It was a lot of effort and I appreciate you taking the time!
      </p>

      <div class="pb-10">
        <Footer class="w-screen text-center"></Footer>
      </div>
    </div>
  </div>

</template>

<style scoped>
.App {
  background-image: url('@/assets/images/backgroundImages/background.png');
}

.dark-hero {
  background-image: url('@/assets/images/backgroundImages/heroDark.jpg');
}
</style>
