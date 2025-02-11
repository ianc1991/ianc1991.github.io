<script setup>
import { ref, onMounted, nextTick } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const texts = ref([
  { text: "Hello, Internet", extra: "", visible: false },
  { text: "My name is ", extra: "Ian Christian", visible: false },
  { text: "I am a ", extra: "Web Developer", visible: false },
])
const showButton = ref(false)
const leaving = ref(false)
const leavingTexts = ref([false, false, false]) // Track staggered text exit

const typeText = async (index) => {
  if (index >= texts.value.length) {
    showButton.value = true
    return
  }
  texts.value[index].visible = true
  await new Promise((resolve) => setTimeout(resolve, 1000))
  typeText(index + 1)
}

const startTyping = () => {
  setTimeout(() => typeText(0), 500) // Small delay after everything is ready
}

const transitionOut = () => {
  leaving.value = true // Start exit animation for button
  setTimeout(() => {
    leavingTexts.value[2] = true // Start removing last text
    setTimeout(() => {
      leavingTexts.value[1] = true // Remove second text
      setTimeout(() => {
        leavingTexts.value[0] = true // Remove first text
        setTimeout(() => {
          router.push("/about") // Navigate after all animations
        }, 600) // Match CSS animation duration
      }, 300)
    }, 300)
  }, 300) // Button disappears first
}

onMounted(async () => {
  if (document.readyState === "complete") {
    startTyping() // Start immediately if already loaded
  } else {
    window.addEventListener("load", () => {
      nextTick(() => startTyping()) // Ensure Vue is fully rendered before animation
    })
  }
})
</script>

<template>
  <main>
    <div class="container">
      <div class="text-wrapper">
        <Transition name="fade-slide">
          <h1 v-if="texts[0].visible && !leavingTexts[0]" key="h1">
            {{ texts[0].text }}
          </h1>
        </Transition>
        <Transition name="fade-slide" appear>
          <p v-if="texts[1].visible && !leavingTexts[1]" key="p1">
            {{ texts[1].text }}
            <span class="special-text">{{ texts[1].extra }}</span>
          </p>
        </Transition>
        <Transition name="fade-slide" appear>
          <p v-if="texts[2].visible && !leavingTexts[2]" key="p2">
            {{ texts[2].text }}
            <span class="special-text">{{ texts[2].extra }}</span>
          </p>
        </Transition>

        <Transition name="fade-button" appear>
          <button v-if="showButton && !leaving" @click="transitionOut">
            Enter
          </button>
        </Transition>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* General Styling */
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  max-width: 400px;
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  z-index: 1;
}

.text-wrapper {
  min-height: 200px;
  position: relative;
}

h1,
p {
  text-align: center;
  margin: 1rem 0;
}

p {
  font-size: 1.2rem;
}

.special-text {
  color: #ff0000;
  font-weight: bold;
}

/* Button Entry & Exit Animation */
.fade-button-enter-active,
.fade-button-leave-active {
  transition:
    opacity 0.3s ease-in,
    transform 0.3s ease-in;
}
.fade-button-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-button-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Text Entry Animation */
.fade-slide-enter-active {
  transition:
    opacity 1s ease-out,
    transform 1s ease-out;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* Text Exit Animation (Staggered) */
.fade-slide-leave-active {
  transition:
    opacity 0.6s ease-in,
    transform 0.6s ease-in;
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
