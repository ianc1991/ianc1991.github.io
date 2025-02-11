<script setup>
import { ref, onMounted } from "vue"

const section = ref("what-i-do")
const introAnimation = ref(false)

const setSection = (newSection) => {
  section.value = newSection
}

onMounted(() => {
  setTimeout(() => {
    introAnimation.value = true
  }, 200)
})
</script>

<template>
  <div
    class="about-container-main"
    :class="{ 'intro-animate': introAnimation }"
  >
    <div class="left-container" :class="{ 'intro-animate': introAnimation }">
      <div
        class="about-section-selector-container"
        :class="{ 'intro-animate': introAnimation }"
      >
        <button
          @click="setSection('what-i-do')"
          :class="{ active: section === 'what-i-do' }"
        >
          What I Do
        </button>
        <button
          @click="setSection('who-i-am')"
          :class="{ active: section === 'who-i-am' }"
        >
          Who I Am
        </button>
        <button
          @click="setSection('where-am-i-going')"
          :class="{ active: section === 'where-am-i-going' }"
        >
          Where Am I Going
        </button>
        <button
          @click="setSection('get-in-touch')"
          :class="{ active: section === 'get-in-touch' }"
        >
          Get In Touch
        </button>
      </div>
      <div
        class="about-image-container"
        :class="{ 'intro-animate': introAnimation }"
      >
        <p>Ian Christian</p>
        <img
          src="../../public/62260491.jpg"
          alt="Ian Christian"
          style="max-width: 150px"
        />
        <p>Developing the Web</p>
      </div>
    </div>

    <div class="about-container" :class="{ 'intro-animate': introAnimation }">
      <Transition name="fade" mode="out-in">
        <div v-if="section === 'what-i-do'" key="what-i-do">
          <h1 class="intro-animate">What I Do</h1>
          <p class="intro-animate">
            I am a full-stack developer with several years of professional
            experience and a passion for creating beautiful and functional web
            applications. I specialize in front-end development, but I am also
            experienced in back-end development. I have experience with a
            variety of technologies, including HTML, CSS, JavaScript, C#,
            Vue.js, Angular, Node.js, Express, MongoDB, SQL and much more.
          </p>
        </div>

        <div v-else-if="section === 'who-i-am'" key="who-i-am">
          <h1 class="intro-animate">Who I Am</h1>
          <p class="intro-animate">
            I am a creative and detail-oriented individual who is always looking
            for new ways to improve my skills. I am a quick learner and a
            problem solver who is not afraid to take on new challenges. I am
            passionate about technology and enjoy working on projects that allow
            me to use my skills to create something amazing.
            <br /><br />
            I enjoy working out of my comfort zone and learning new things. For
            example, I enjoy doing game development in my free time.
            <br /><br />
            When I am not coding, you can find me reading, playing video games,
            strumming my guitar, or spending time with my wife.
          </p>
        </div>

        <div v-else-if="section === 'where-am-i-going'" key="where-am-i-going">
          <h1 class="intro-animate">Where Am I Going?</h1>
          <p class="intro-animate">
            I am always looking for new opportunities to grow and expand my
            skills. Whether it's diving into cutting-edge technologies, refining
            my craft, or tackling new challenges, I thrive on continuous
            learning.
          </p>
        </div>

        <div v-else-if="section === 'get-in-touch'" key="get-in-touch">
          <h1 class="intro-animate">Get In Touch</h1>
          <p class="intro-animate">
            If you have a project you'd like to discuss, or if you just want to
            say hello, feel free to get in touch. I'm always open to new
            opportunities and collaborations.
            <br /><br />
            <a href="mailto:ianmchristian@gmail.com">Email Me!</a>
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* Initial state (before animation) */
.about-container-main,
.left-container,
.about-container,
.about-section-selector-container,
.about-image-container {
  opacity: 0;
  transform: translateY(10px);
}

/* When page loads */
.intro-animate {
  opacity: 1 !important;
  transform: translateY(0);
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: rgba(255, 220, 220, 0.85);
  text-shadow: 0px 0px 10px rgba(255, 75, 43, 0.2);
}

.about-section-selector-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin: 1rem;
  padding: 2rem;
  border: solid 1px rgba(255, 75, 43, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(255, 65, 108, 0.3);
  z-index: 5;
}

.about-container-main {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
  z-index: 5;
}

/* Transition Effects */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Active Button Styling */
button {
  background: none;
  border: 2px solid rgba(255, 75, 43, 0.8);
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-radius: 5px;
  animation: unset;
}

button.active {
  background: linear-gradient(45deg, #ff416c, #ff4b2b);
}

button:hover {
  transform: scale(1.05);
}

.about-container {
  max-width: 700px;
  margin: 3rem auto;
  padding: 2rem;
  background: rgba(30, 0, 10, 0);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(255, 65, 108, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 75, 43, 0.3);
  text-align: center;
  overflow: hidden;
  transition:
    opacity 0.4s ease-in-out,
    transform 0.4s ease-in-out;
}

.about-image-container {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 75, 43, 0.3);
  align-items: center;
  box-shadow: 0 8px 32px rgba(255, 65, 108, 0.3);
  gap: 1rem;
  backdrop-filter: blur(10px);
  z-index: 5;
}

.left-container {
  z-index: 5;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  background: linear-gradient(45deg, #ff416c, #ff4b2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  text-shadow: 0px 0px 10px rgba(255, 75, 43, 0.6);
}
</style>
