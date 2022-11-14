export default defineNuxtRouteMiddleware((to, from) => {
    switch (to.path) {
        // in case users come from old url
        case '/ramecky/index.php':
            return navigateTo('/ramecky')
    }
})