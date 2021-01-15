
const routes =  [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/PageLanding.vue'),
      },
      {
        path: '/danke',
        component: () => import('pages/PageThankYou.vue'),
      },
      {
        path: '/geschenk',
        component: () => import('pages/PagePresent.vue'),
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
