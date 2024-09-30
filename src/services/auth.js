export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const setAdminTokenAndClinicId = (token, clinicId) => {
    localStorage.setItem('admin_token', token);
    localStorage.setItem('clinic_id', clinicId);
};

export const getAdminToken = () => {
    return localStorage.getItem('admin_token');
};

export const getAdminClinicId = () => {
    return localStorage.getItem('clinic_id');
};

export const removeAdminTokenAndClinicId = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('clinic_id');
};