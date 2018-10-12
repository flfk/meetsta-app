import { createActionSet } from '../../utils/ActionHelpers';

export const CREATE_USER = createActionSet('CREATE_USER');
export const LOGIN_USER = createActionSet('LOGIN_USER');
export const LOGIN_USER_FACEBOOK = createActionSet('LOGIN_USER_FACEBOOK');
export const GET_LOGGED_IN_USER = createActionSet('RETRIEVE_LOGGED_IN_USER');
export const SIGNOUT_USER = createActionSet('SIGNOUT_USER');
export const UPDATE_DISPLAY_NAME = createActionSet('UPDATE_DISPLAY_NAME');
