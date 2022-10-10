import { mod } from './drawing'
import Vector from './vector'

class Particle {
  position: Vector
  previousPosition: Vector
  velocity: Vector
  acceleration: Vector
  damping: number = 0.01

  constructor(position?: Vector, velocity?: Vector) {
    this.position = position ?? Vector.ZERO
    this.velocity = velocity ?? Vector.ZERO
    this.acceleration = Vector.ZERO
    this.previousPosition = this.position
  }

  applyAcceleration(acceleration: Vector) {
    this.acceleration = this.acceleration.add(acceleration)
  }

  update(width: number, height: number) {
    // Update previous position
    this.previousPosition = this.position

    // Euler integration step
    this.position = this.position.add(this.velocity)
    this.velocity = this.velocity.add(this.acceleration).mul(1 - this.damping)
    this.acceleration = Vector.ZERO

    const preWrapPos = { x: this.position.x, y: this.position.y }

    // Wrap around
    this.position.x = mod(this.position.x, width)
    this.position.y = mod(this.position.y, height)

    // (For fixing line segments on wrap around)
    if (Math.floor(preWrapPos.x) !== Math.floor(this.position.x) || Math.floor(preWrapPos.y) !== Math.floor(this.position.y)) this.previousPosition = this.position
  }
}


export default Particle
