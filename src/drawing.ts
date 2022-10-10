export const TAU = Math.PI * 2

export const fillCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number = 1) => {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, TAU)
  ctx.fill()
}

export const mod = (n: number, m: number) => ((n % m) + m) % m;
