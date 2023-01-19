import directives from '@/components/directives'
export default function (app) {
  for (const key in directives) {
    const value = directives[key]
    app.directive(key, value)
  }
}