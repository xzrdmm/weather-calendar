import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default function fixHtmlPlugin() {
  return [
    // Plugin 1: 在 Rollup 打包阶段转义 JS bundle 中的 </script>
    {
      name: 'fix-html-escape',
      enforce: 'post',
      apply: 'build',
      generateBundle(_, bundle) {
        for (const key of Object.keys(bundle)) {
          const chunk = bundle[key]
          if (chunk.type === 'chunk') {
            // 转义 JS 代码中的 </script>，防止 HTML 解析器提前关闭标签
            chunk.code = chunk.code.replace(/<\/script>/gi, '<\\/script>')
          }
        }
      },
    },
    // Plugin 2: 后处理 HTML，合并 script 到 body 末尾
    {
      name: 'fix-html-merge',
      enforce: 'post',
      apply: 'build',
      closeBundle() {
        const distDir = resolve(__dirname, 'dist')
        const htmlPath = resolve(distDir, 'index.html')
        if (!existsSync(htmlPath)) return

        let html = readFileSync(htmlPath, 'utf8')

        // 收集所有 script 内容
        const scripts = []
        html = html.replace(/<script[^>]*>([\s\S]*?)<\/script>/g, (_, content) => {
          scripts.push(content)
          return ''
        })

        // 清理 style 标签残留属性
        html = html.replace(/<style[^>]*>/, '<style>')

        // 合并放到 </body> 前
        if (scripts.length > 0) {
          const merged = '<script>' + scripts.join('\n') + '</script>'
          html = html.replace('</body>', merged + '\n</body>')
        }

        writeFileSync(htmlPath, html, 'utf8')
        console.log('[fix-html] Merged ' + scripts.length + ' script(s) at end of body')
      },
    },
  ]
}
