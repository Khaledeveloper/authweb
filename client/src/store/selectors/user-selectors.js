import { createSelector } from 'reselect';

const selectUsers = state => state.userAuth;


export const selectUserAuth = createSelector(
selectUsers, 
  userAuth => userAuth.authUser
);

