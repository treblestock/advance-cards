import {render, h} from 'vue'


export default function({el, component, props, appContext}) {
  let vnode = h(component, props)
  vnode.appContext = appContext
  render(vnode, el)

  return () => {
    render(null, el)
    vnode = null
  }
}