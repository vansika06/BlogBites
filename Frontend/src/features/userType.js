export const UserType = (state) => {
    if (state.auth.status) {
      return { type: 'user', data: state.auth.userData };
    } else if (state.ngo.status) {
      return { type: 'ngo', data: state.ngo.ngoData };
    }
    return { type: 'none', data: null };
  };