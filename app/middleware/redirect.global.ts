export default defineNuxtRouteMiddleware((to) => {
  // in case users come from old url
  if (to.path?.includes('/ramecky/index.php')) {
    return navigateTo('/ramecky')
  }
})
