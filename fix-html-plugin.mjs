import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default function fixHtmlPlugin() {
  return {
    name: 'fix-html',
    enforce: 'post',
    apply: 'build',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      const htmlPath = resolve(distDir, 'index.html')
      if (!existsSync(htmlPath)) return

      let html = readFileSync(htmlPath, 'utf8')

      // 收集所有 script 内容，移除所有 script 标签
      const scripts = []
      html = html.replace(/<script[^>]*>([\s\S]*?)<\/script>/g, (_, content) => {
        scripts.push(content)
        return ''
      })

      // 清理 style 标签的残留属性
      html = html.replace(/<style[^>]*>/, '<style>')

      // 合并所有 script 为一个，放到 </body> 前
      if (scripts.length > 0) {
        const merged = '<script>' + scripts.join('\n') + '</script>'
        html = html.replace('</body>', merged + '\n</body>')
      }

      writeFileSync(htmlPath, html, 'utf8')
      console.log('[fix-html] Merged ' + scripts.length + ' script(s), moved to end of body')
    },
  }
}
