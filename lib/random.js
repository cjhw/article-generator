// 函数返回一个大于等于 min，小于 max 的随机整数
export function randomInt(min, max) {
  const p = Math.random()
  return Math.floor(min * (1 - p) + max * p)
}

export function createRandomPicker(arr) {
  arr = [...arr] // copy 数组，以免修改原始数据
  function randomPick() {
    const len = arr.length - 1
    const index = randomInt(0, len)
    const picked = arr[index]
    ;[arr[index], arr[len]] = [arr[len], arr[index]]
    return picked
  }
  // 抛弃第一次选择结果，避免原本数组末位的那个元素在第一次随机取时永远取不到的问题
  randomPick()
  return randomPick
}
