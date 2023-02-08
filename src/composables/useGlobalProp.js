import useApp from '@/composables/useApp'

export default function(globalPropertyName) {
  return useApp().config.globalProperties[globalPropertyName]
}
