import { SHOW_TOASTER, REMOVE_TOASTER } from './actionTypes';

export const toastReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case SHOW_TOASTER: {
      console.log('STATEEEEED in ADD = ', state);
      return {
        ...state,
        toasts: [...state.toasts, payload],
      };
    }
    case REMOVE_TOASTER: {
      console.log('STATEEEEED in REMOVE = ', state);
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== payload.id),
      };
    }

    default:
      return state;
  }
};
