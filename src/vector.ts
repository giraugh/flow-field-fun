class Vector {
  x: number
  y: number

  static ZERO = new Vector(0, 0)
  static ONE = new Vector(1, 1)

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(other: Vector) {
    return new Vector(this.x + other.x, this.y + other.y)
  }

  sub(other: Vector) {
    return new Vector(this.x - other.x, this.y - other.y)
  }

  mul(other: Vector | number) {
    if (typeof other === 'number') return new Vector(this.x * other, this.y * other)
    return new Vector(this.x * other.x, this.y * other.y)
  }

  mag() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }

  norm() {
    return new Vector(this.x, this.y).mul(1/this.mag())
  }

  rotate(angle: number) {
    return new Vector(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle),
    )
  }

  dot(other: Vector) {
    return other.x * this.x + other.y * this.y
  }

  angle() {
    return Math.atan2(this.y, this.x)
  }

  static random() {
    return new Vector((Math.random()*2)-1, (Math.random()*2)-1)
  }

  static fromAngle(angle: number) {
    return new Vector(Math.cos(angle), Math.sin(angle))
  }
}

export default Vector
