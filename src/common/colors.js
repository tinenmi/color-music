const Hsv2Rgb = ({hue, saturation, value}) => {
    const i = Math.floor(hue * 6)
    const f = hue * 6 - i
    const p = value * (1 - saturation)
    const q = value * (1 - f * saturation)
    const t = value * (1 - (1 - f) * saturation)

    const [red, green, blue] = (()=> {
      switch (i % 6) {
        case 0: return [value, t, p]
        case 1: return [q, value, p]
        case 2: return [p, value, t]
        case 3: return [p, q, value]
        case 4: return [t, p, value]
        case 5: return [value, p, q]
        default: return [0, 0 , 0]
      }
    })();

    return {
        red: Math.round(red* 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255)
    }
}

const Rgb2Hsv = ({red, green, blue}, options = null) => {

    let defaultHue = 0
    if (options != null) {
      defaultHue = options.defaultHue
    }

    const max = Math.max(red, green, blue), min = Math.min(red, green, blue);
    const delta = max - min;
    const saturation = max === 0 ? 0 : delta / max;
    const value = max / 255;

    const hue = (delta === 0)
    ? defaultHue
    : (() => {
      switch (max) {
        case min: return 0;
        case red: return (green - blue) + delta * (green < blue ? 6: 0);
        case green: return (blue - red) + delta * 2;
        case blue: return (red - green) + delta * 4;
        default: return 0;
      }
    })() / 6 / delta;

    return { hue, saturation, value }
}

const formatColor =
  ({red, green, blue}, alpha = 1) =>
  (`rgba(${red}, ${green}, ${blue}, ${alpha})`)

const formatHue = (hue) => formatColor(Hsv2Rgb({hue, saturation: 1, value:1}))

const formatHsvColor = (hsvColor) => formatColor(Hsv2Rgb(hsvColor))

export {Hsv2Rgb, Rgb2Hsv, formatColor, formatHue, formatHsvColor}
