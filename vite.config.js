import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

import path from 'path'

// import cssSugarss from 'sugarss'
import cssImport from 'postcss-import'
import cssNested from 'postcss-nested'
import cssMixins from 'postcss-mixins'
import cssFunctions from 'postcss-functions'
import cssSimpleVars from 'postcss-simple-vars'


const sharedConfigPart = {
  plugins: [vue({
    
  }), svgLoader()],
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
}


// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  if (command === 'serve') {
    return {
      ...sharedConfigPart,
    }
  }
  return {
    ...sharedConfigPart,
    base: '/advance-cards/',
  }
})
