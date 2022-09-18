import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve, posix } from 'path'
import moment from 'moment'

const __dirname = dirname(fileURLToPath(import.meta.url))

export function loadCorpus(src) {
  const path = resolve(__dirname, '../', src)
  const data = readFileSync(path, { encoding: 'utf-8' })
  return JSON.parse(data)
}

export function saveCorpus(title, article) {
  const outputDir = resolve(__dirname, '..', 'output')
  const time = moment().format('YYYY-MM-DD-HH时mm分ss秒')
  const outputFile = resolve(outputDir, `${time}.txt`)
  // 检查outputDir是否存在，没有则创建一个
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir)
  }
  const text = `${title}\n\n    ${article.join('\n    ')}`
  writeFileSync(outputFile, text) // 将text写入outputFile文件中

  return outputFile
}
