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
  changePassword: async ({oldPassword, newPassword }) => {
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
    activeStaff: async (id) => {
        let res = await privateHttp({
            method: 'patch',
            url: '/staff/inactive/' + id
        });
        return res;
    }
}

export default STAFF;