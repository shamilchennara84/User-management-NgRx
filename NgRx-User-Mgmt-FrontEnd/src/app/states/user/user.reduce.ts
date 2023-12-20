import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { retrieveProfileSuccess, retrieveUsersSuccess } from './user.actions';

export const userInitialState: User = {
  _id: '',
  name: '',
  email: '',
  password: '',
  image: '',
};

const _profileReducer = createReducer(
  userInitialState,
  on(retrieveProfileSuccess, (state, { userDetails }): User => {
    return userDetails;
  })
);

export function profileReducer(state: any, action: any) {
  return _profileReducer(state, action);
}

//=======================================================//

export const initialState: User[] = [];

const _UsersReducer = createReducer(
  initialState,
  on(retrieveUsersSuccess, (state, { allUsers }): User[] => {
    return [...allUsers];
  })
);

export function usersReducer(state: User[] | undefined, action: any) {
  return _UsersReducer(state, action);
}
