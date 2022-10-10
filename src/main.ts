import { createNoise3D } from 'simplex-noise'

import './style.css'

import Particle from './particle'
import Vector from './vector'
import { fillCircle, mod, TAU } from './drawing'

const noise = createNoise3D()

// Setup canvas
const canvas = document.querySelector('canvas')! as HTMLCanvasElement
const canvasBB = canvas.getBoundingClientRect()
const ctx = canvas.getContext('2d')!
const [width, height] = [1000, 1000]
const canvasSizeRatio = [width/canvasBB.width, height/canvasBB.height]
canvas.width = width
canvas.height = height

// Track mouse
const mouse = new Vector(width/2, height/2)
canvas.addEventListener('mousemove', e => {
  mouse.x = (e.clientX - canvasBB.left) * canvasSizeRatio[0]
  mouse.y = (e.clientY - canvasBB.top) * canvasSizeRatio[1]
})

// Track mouse
let leftMouseDown = false
let rightMouseDown = false
canvas.addEventListener('mousedown', e => {
  if (e.button === 0) leftMouseDown = true
  if (e.button === 2) rightMouseDown = true
  e.preventDefault()
})
canvas.addEventListener('mouseup', e => {
  if (e.button === 0) leftMouseDown = false
  if (e.button === 2) rightMouseDown = false
  e.preventDefault()
})
canvas.addEventListener('contextmenu', e => e.preventDefault())

const setupParticles = () => Array.from({ length: 5_000 }, () => new Particle(
  Vector.random().mul(Math.min(width, height)),
  Vector.random().mul(2),
))

// Maintain an array of particles
let timeSum: number = 0
let time: number = 0
let prevTimeStamp = performance.now()
let particles: Particle[] = setupParticles()

// Track mode changes
let mode: string = 'vortex'
document.querySelector('select#mode')!.addEventListener('change', e => {
  mode = (e.target as HTMLSelectElement).value
  particles = setupParticles()
  ctx.clearRect(0, 0, width, height)
})

let drawMode: string = 'rainbow'
document.querySelector('select#draw-mode')!.addEventListener('change', e => {
  drawMode = (e.target as HTMLSelectElement).value
  ctx.clearRect(0, 0, width, height)
})

/**
 * Draw loop
 */
const draw = (timeStamp: number) => {
  // Increment time
  timeSum += timeStamp
  time += timeStamp - prevTimeStamp
  prevTimeStamp = timeStamp

  // Update particles
  particles.forEach((p, i) => {
    // Vortex mode
    if (mode === 'vortex') {
      // Calculate force
      const to = mouse.sub(p.position).norm()
      p.applyAcceleration(to.mul(leftMouseDown ? -.5 : (rightMouseDown ? 1.5 : .5)))
    }

    // Vortex mode
    if (mode === 'weak-vortex') {
      // Calculate force
      const to = mouse.sub(p.position).norm()
      p.applyAcceleration(to.mul(leftMouseDown ? -.5 : (rightMouseDown ? 1.5 : .1)))
    }

    // Vortex mode
    if (mode === 'random') {
      p.applyAcceleration(Vector.random())
    }

    // Swirling idk
    if (mode === 'indecisive') {
      const angle = (timeSum/500) % TAU
      p.applyAcceleration(Vector.fromAngle(angle).mul(2))
    }

    if (mode === 'noise') {
      const scale = .003
      const sample = TAU * (1 + noise(scale * p.position.x, scale * p.position.y, time/2000)) / 2
      p.velocity = Vector.fromAngle(sample)
    }

    if (mode === 'static-noise') {
      const scale = .003
      const sample = TAU * (1 + noise(scale * p.position.x, scale * p.position.y, 0)) / 2
      p.velocity = Vector.fromAngle(sample)
    }
    
    if (mode === 'spin') {
      p.velocity = p.velocity.rotate(TAU/50).norm().mul(3 * (.1 + (1 + Math.sin(timeSum / 100000))/2))
    }
    
    if (mode === 'arch-enemies') {
      const friend = particles[i % 2 == 0 ? mod(i + 1, particles.length) : mod(i - 1, particles.length)] 
      p.applyAcceleration(friend.position.sub(p.position).norm().mul(-.1))
    }

    if (mode === 'monogamy') {
      const friend = particles[i % 2 == 0 ? mod(i + 1, particles.length) : mod(i - 1, particles.length)] 
      p.applyAcceleration(friend.position.sub(p.position).norm().mul(.1))
    }

    if (mode === 'pulse') {
      p.applyAcceleration(
        new Vector(width/2, height/2)
          .sub(p.position)
          .norm()
          .mul(.1 * Math.sin(time / 800))
      )
    }

    if (mode === 'hula-hoops') {
      const angle = TAU*((time/3000)%1) // TAU * (1 + Math.sin(time / 800)) / 2
      const to = new Vector(width/2, height/2).sub(p.position).norm()
      // p.applyAcceleration(to.mul(.2 * Math.min(0, to.dot(Vector.fromAngle(angle)))))
      p.applyAcceleration(to.mul(.5 * Math.max(1, 1-to.dot(Vector.fromAngle(angle)))))
      p.velocity = p.velocity.norm().mul(Math.max(p.velocity.mag(), 10))
    }

    if (mode === 'spinny-orbs') {
      const angle = TAU*((time/3000)%1) // TAU * (1 + Math.sin(time / 800)) / 2
      const to = new Vector(width/2, height/2).sub(p.position).norm()
      p.applyAcceleration(to.mul(.2 * Math.min(0, to.dot(Vector.fromAngle(angle)))))
      p.applyAcceleration(to.mul(.5 * Math.max(1, 1-to.dot(Vector.fromAngle(angle)))))
    }

    // Euler integrate
    p.update(width, height)
  }) 

  // Draw screen
  if (drawMode === 'rainbow')
    ctx.fillStyle = 'rgba(255, 255, 255, .2)'
  if (drawMode === 'sand' || drawMode === 'line-segment-sand')
    ctx.fillStyle = 'rgba(255, 255, 255, 0)'
  if (drawMode === 'ghost' || drawMode === 'line-segment-ghost')
    ctx.fillStyle = 'rgba(255, 255, 255, 0.005)'
  if (drawMode === 'simple')
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
  if (drawMode === 'line-segment')
    ctx.fillStyle = 'rgba(255, 255, 255, .2)'

  ctx.fillRect(0, 0, width, height)

  // Draw particles
  particles.forEach(p => {
    if (drawMode === 'rainbow') {
      ctx.fillStyle = `hsla(${(p.velocity.angle() / TAU) * 360} 50% 50% / 1)`
      fillCircle(ctx, p.position.x, p.position.y, 4)
    }

    if (drawMode === 'sand') {
      ctx.fillStyle = `rgba(0, 0, 0, .01)`
      fillCircle(ctx, p.position.x, p.position.y, 2)
    }

    if (drawMode === 'ghost') {
      ctx.fillStyle = `rgba(0, 0, 0, .01)`
      fillCircle(ctx, p.position.x, p.position.y, 3)
    }

    if (drawMode === 'simple') {
      ctx.fillStyle = `rgba(0, 0, 0, 1)`
      fillCircle(ctx, p.position.x, p.position.y, 1)
    }

    if (drawMode === 'line-segment') {
      ctx.strokeStyle = `rgba(0, 0, 0, .5)`
      ctx.beginPath()
      ctx.moveTo(p.previousPosition.x, p.previousPosition.y)
      ctx.lineTo(p.position.x, p.position.y)
      ctx.stroke()
    }

    if (drawMode === 'line-segment-sand') {
      ctx.strokeStyle = `rgba(0, 0, 0, .1)`
      ctx.beginPath()
      ctx.moveTo(p.previousPosition.x, p.previousPosition.y)
      ctx.lineTo(p.position.x, p.position.y)
      ctx.stroke()
    }

    if (drawMode === 'line-segment-ghost') {
      ctx.strokeStyle = `rgba(0, 0, 0, .02)`
      ctx.beginPath()
      ctx.moveTo(p.previousPosition.x, p.previousPosition.y)
      ctx.lineTo(p.position.x, p.position.y)
      ctx.stroke()
    }
  })

  requestAnimationFrame(draw)
}

// Start draw loop
requestAnimationFrame(draw)
