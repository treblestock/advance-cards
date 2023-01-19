import UI from '@/components/UI'
export default function (app) {
  for (const key in UI) {
    const value = UI[key]
    app.component(key, value)
  }
}