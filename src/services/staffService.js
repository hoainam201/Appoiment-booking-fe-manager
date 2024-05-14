import privateHttp from './http/privateHttp.config';
import publicHttp from './http/publicHttp.config';
import formdataHttpConfig from "./http/formdataHttp.config";

const STAFF = {
    register: async ({name, email, password}) => {
        let res = await publicHttp({
            method: 'post',
            url: '/staff/register',
            data: {
                name,
                email,
                password
            }
        });
        return res;
    },
    login: async ({email, password}) => {
        let res = await publicHttp({
            method: 'post',
            url: '/staff/login',
            data: {
                email,
                password
            }
        });
        return res;
    },
    forgotPassword: async ({email}) => {
        let res = await publicHttp({
            method: 'post',
            url: '/staff/forget-password',
            data: {
                email
            }
        });
        return res;
    },
    changePassword: async ({oldPassword, newPassword}) => {
        let res = await privateHttp({
            method: 'put',
            url: '/staff/change-password',
            data: {
                oldPassword,
                newPassword
            }
        });
        return res;
    },
    getProfile: async () => {
        let res = await privateHttp({
            method: 'get',
            url: '/staff/find-user'
        });
        return res;
    },
    updateProfile: async ({name, file}) => {
        let res = await formdataHttpConfig({
            method: 'post',
            url: '/staff/update-profile',
            data: {
                name,
                file
            },
        });
        return res;
    },
    getFacilities: async (pageNumber) => {
        let res = await publicHttp({
            method: 'get',
            url: '/health-facilities' + (pageNumber ? `?page=${pageNumber}` : '')
        });
        return res;
    },
    getFacilityDetail: async (id) => {
        let res = await publicHttp({
            method: 'get',
            url: '/health-facilities/' + id
        });
        return res;
    },
    getDoctors: async (pageNumber) => {
        let res = await publicHttp({
            method: 'get',
            url: '/doctor/' + (pageNumber ? `?page=${pageNumber}` : '')
        });
        return res;
    },
    getRole: async () => {
        let res = await privateHttp({
            method: 'get',
            url: '/staff/get-role'
        });
        return res;
    },
    getGuide: async () => {
        let res = await privateHttp({
            method: 'get',
            url: '/news/get-by-doctor'
        });
        return res;
    },
    createGuide: async (title, content) => {
        let res = await privateHttp({
            method: 'post',
            url: '/news',
            data: {
                title,
                content
            }
        });
        return res;
    },
    updateGuide: async (id, title, content) => {
        let res = await privateHttp({
            method: 'put',
            url: '/news/' + id,
            data: {
                title,
                content
            }
        });
        return res;
    },
    hideGuide: async (id) => {
        let res = await privateHttp({
            method: 'patch',
            url: '/news/hide/' + id
        });
        return res;
    },
    showGuide: async (id) => {
        let res = await privateHttp({
            method: 'patch',
            url: '/news/show/' + id
        });
        return res;
    },
    getGuideDetail: async (id) => {
        let res = await publicHttp({
            method: 'get',
            url: '/news/' + id
        });
        return res;
    },
    getAllStaff: async () => {
        let res = await privateHttp({
            method: 'get',
            url: '/staff/get-all-staff'
        });
        return res;
    },
    createStaff: async ({name, email, role}) => {
        let res = await privateHttp({
            method: 'post',
            url: '/staff/create',
            data: {
                name,
                email,
                role
            }
        })
        return res;
    },
    getDoctorList: async () => {
        let res = await privateHttp({
            method: 'get',
            url: '/staff/get-doctors'
        });
        return res;
    },
    activeStaff: async (id) => {
        let res = await privateHttp({
            method: 'patch',
            url: '/staff/inactive/' + id
        });
        return res;
    },
    getFacilityByToken: async () => {
        let res = await privateHttp({
            method: 'get',
            url: '/health-facilities/get-by-token'
        })
        return res;
    },
    updateFacility: async ({email, name, address, phone, specialities, description, type, file, lat, lng}) => {
        let res = await formdataHttpConfig({
            method: 'put',
            url: '/health-facilities/update',
            data: {
                email,
                name,
                address,
                phone,
                description,
                specialities,
                type,
                file,
                latitude: lat,
                longitude: lng
            },
        })
        return res;
    },
    getServices: async () => {
        let res = await privateHttp({
            method: 'get',
            url: '/health-service/get-all-by-token'
        });
        return res;
    },
    getServiceDetail: async (id) => {
        let res = await publicHttp({
            method: 'get',
            url: '/health-service/' + id
        });
        return res;
    },
    createService: async ({name, description, fee, type, speciality, chargeOf, file}) => {
        let res = await formdataHttpConfig({
            method: 'post',
            url: '/health-service/create',
            data: {
                name,
                description,
                fee,
                type,
                speciality,
                chargeOf,
                file
            },
        })
        return res;
    },
    getServiceById: async (id) => {
        let res = await publicHttp({
            method: 'get',
            url: '/health-service/' + id
        });
        return res;
    },
    updateService: async ({id, name, description, fee, type, speciality, chargeOf, file}) => {
        let res = await formdataHttpConfig({
            method: 'put',
            url: '/health-service/' + id,
            data: {
                name,
                description,
                fee,
                type,
                speciality,
                chargeOf,
                file
            },
        })
        return res;
    },
    getReviewsByServiceId: async (id, page) => {
        let res = await publicHttp({
            method: 'get',
            url: '/service-review/' + id + `?page=${page}`
        });
        return res;
    }
}

export default STAFF;