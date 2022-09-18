import { randomInt, createRandomPicker } from './random.js'

// 替换句子
function sentence(pick, replacer) {
  let ret = pick()
  for (let key in replacer) {
    ret = ret.replace(
      new RegExp(`{{${key}}}`, 'g'),
      typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]
    )
  }
  return ret
}

export function generate(
  title,
  {
    corpus,
    min = 6000, // 文章最少字数
    max = 10000, // 文章最多字数
  } = {}
) {
  const articleLength = randomInt(min, max)
  const { famous, bosh_before, bosh, said, conclude } = corpus
  const [pickFamous, pickBoshBefore, pickBosh, pickSaid, pickConclude] = [
    famous,
    bosh_before,
    bosh,
    said,
    conclude,
  ].map(createRandomPicker)

  const article = []
  let totalLength = 0

  while (totalLength < articleLength) {
    let section = ''
    // 每段200到500字
    const sectionLength = randomInt(200, 500)
    // 如果当前段落字数小于段落长度，或者当前段落不是以句号。和问号？结尾
    while (section.length < sectionLength || !/[。？]$/.test(section)) {
      // 取一个 0~100 的随机数
      const n = randomInt(0, 100)
      if (n < 20) {
        // 添加名人名言
        section += sentence(pickFamous, {
          said: pickSaid,
          conclude: pickConclude,
        })
      } else if (n < 50) {
        // 添加带前置从句的废话
        section +=
          sentence(pickBoshBefore, { title }) + sentence(pickBosh, { title })
      } else {
        // 添加不带前置从句的废话
        section += sentence(pickBosh, { title })
      }
    }
    // 段落结束，更新总长度
    totalLength += section.length
    // 将段落存放到文章列表中
    article.push(section)
  }
  return article
}
