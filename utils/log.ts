let enabled = false

export const enable = () => enabled = true
export const disable = () => enabled = false

export const log = (...items: any[]) => {
  if (enabled) {
    console.log(...items)
  }
}

export const xlog = (...items: any[]) => null