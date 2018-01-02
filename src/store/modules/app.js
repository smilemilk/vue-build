import { jsCookie } from '@/utils/auth';

const app = {
  state: {
    sidebar: {
      opened: !+jsCookie.get('sidebarStatus')
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        jsCookie.set('sidebarStatus', 1);
      } else {
        jsCookie.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR');
    }
  }
}

export default app;
