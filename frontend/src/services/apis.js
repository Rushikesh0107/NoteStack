const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const authEndpoints  = {
    LOGIN_API: BASE_URL + '/users/login',
    REGISTER_API: BASE_URL + '/users/register',
    LOGOUT_API: BASE_URL + '/users/logout',
}

export const userEndpoints = {
    UPDATE_USER_AVATAR_API: BASE_URL + '/users/update-avatar',
    UPDATE_USER_INFO_API: BASE_URL + '/users/update-details',
    UPDATE_USER_ADDRESS_API: BASE_URL + '/address/update-address',
}

export const adminEndppoints = {
    ADMIN_LOGIN_API : BASE_URL + '/admin/admin-login'
}

export const subjectEndpoints = {
    GET_SUBJECTS_API: BASE_URL + '/subject/get-subjects',
}

export const departmentEndpoints = {
    GET_DEPARTMENTS_API: BASE_URL + '/department/get-departments',
}

export const notesEndpoints = {
    GET_NOTES_API: BASE_URL + '/notes/get-notes',
}

export const pyqEndpoints = {
    GET_PYQ_API: BASE_URL + "/pyq/get-pyq"
}
