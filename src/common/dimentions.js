export const bounds = (min, value, max) =>
   (Math.min(Math.max(min, value), max))

export const relative = (min, value, max) => {
  const bounded_value = bounds(min, value, max)
  const result = bounded_value / (max - min)
  return result
}

export const getWidth = (element) => {
  const width_formatted = window.getComputedStyle(element).width
  const width = parseFloat(width_formatted.substring(0, width_formatted.length - 2))
  return width;
}

export const getHeight = (element) => {
  const height_formatted = window.getComputedStyle(element).height
  const height = parseFloat(height_formatted.substring(0, height_formatted.length - 2))
  return height;
}
