<script setup>
import { onMounted, ref } from "vue"

const canvasRef = ref(null)

onMounted(() => {
  if (!canvasRef.value) {
    console.error("Canvas not found!")
    return
  }

  console.log("Canvas is ready. Adding event listener...")

  const canvas = canvasRef.value
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const lines = []

  let lastLineTime = 0

  function drawLines() {
    const now = Date.now()
    if (now - lastLineTime < 500) return // Limit to 1 line every 0.5s
    lastLineTime = now

    const speed = 3
    const x = Math.random() * canvas.width // Random x position
    const y = 0 // Start from top

    // Force more downward movement
    const baseAngle = Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 0.3 // Mostly downward
    const dir = {
      dx: Math.cos(baseAngle) * speed,
      dy: Math.sin(baseAngle) * speed,
    }

    if (lines.length >= 5) lines.shift()

    lines.push({
      path: [{ x, y }],
      dx: dir.dx,
      dy: dir.dy,
      zigzagCount: 0, // Track zig-zags
      lastZigzagTime: now, // Track time for zig-zags
      maxZigzags: 10, // Allow up to 4 changes
      life: 150,
      glow: true,
    })
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const now = Date.now()
      const lastPos = line.path[line.path.length - 1]
      const newX = lastPos.x + line.dx * 2
      const newY = lastPos.y + line.dy * 2
      line.path.push({ x: newX, y: newY })

      // Zig-zag logic
      if (
        line.zigzagCount < line.maxZigzags &&
        now - line.lastZigzagTime >= 300 // At least 0.2s between changes
      ) {
        const angle = (Math.random() - 0.5) * Math.PI * 0.25 // Small random angle change
        const newDx = line.dx * Math.cos(angle) - line.dy * Math.sin(angle)
        const newDy = line.dx * Math.sin(angle) + line.dy * Math.cos(angle)
        line.dx = newDx
        line.dy = newDy
        line.zigzagCount++
        line.lastZigzagTime = now
      }

      ctx.beginPath()
      ctx.moveTo(line.path[0].x, line.path[0].y)
      for (const point of line.path) {
        ctx.lineTo(point.x, point.y)
      }
      ctx.strokeStyle = `rgba(0, 200, 255, ${line.life / 100})`
      ctx.lineWidth = 3
      ctx.stroke()

      if (line.glow) {
        ctx.beginPath()
        ctx.arc(newX, newY, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 200, 255, ${line.life / 100})`
        ctx.shadowColor = "rgba(0, 200, 255, 0.8)"
        ctx.shadowBlur = 10
        ctx.fill()
      }

      line.life--
      if (line.life <= 0) {
        lines.splice(i, 1)
        i--
      }
    }

    requestAnimationFrame(update)
  }

  setInterval(drawLines, 500) // Generate new lines every 0.5s

  update()
  setInterval(drawLines, 500) // Generate new lines every 0.5s
})
</script>

<template>
  <canvas ref="canvasRef" class="background-canvas"></canvas>
</template>

<style scoped>
.background-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
}
</style>
