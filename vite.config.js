import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://github.com/あなたのGitHubユーザー名/sakuragawa-site/ で公開する場合、
// base: '/sakuragawa-site/' を設定する必要があります。
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/sakuragawa-site/', 
})