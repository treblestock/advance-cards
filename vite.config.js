import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// import cssSugarss from 'sugarss'
import cssImport from 'postcss-import'
import cssNested from 'postcss-nested'
import cssMixins from 'postcss-mixins'
import cssFunctions from 'postcss-functions'
import cssSimpleVars from 'postcss-simple-vars'




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    postcss: {
      plugins: [
        cssImport,
        cssNested,
        cssMixins,
        cssFunctions,
        cssSimpleVars,
      ],
    }
  }  
})
