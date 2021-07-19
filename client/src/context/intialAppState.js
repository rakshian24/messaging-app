import { v4 as uuid } from 'uuid';
import { SUCCESS, ERROR, INFO, WARNING } from '../constant';

export const INITIAL_APP_STATE = {
  isUserLoggedIn: false,
  user: {},
  toasts: [
    {
      id: uuid(),
      type: SUCCESS,
      title: 'Success',
      message: 'Successfully fetched user data',
    },
    // {
    //   id: uuid(),
    //   type: ERROR,
    //   title: 'Error',
    //   message: 'Something Went Wrong!',
    // },
    // {
    //   id: uuid(),
    //   type: WARNING,
    //   title: 'Warning',
    //   message: 'Be aware of Bugs!',
    // },
    // {
    //   id: uuid(),
    //   type: INFO,
    //   title: 'Info',
    //   message: 'Some Info',
    // },
  ],
};
