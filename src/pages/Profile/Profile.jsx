import STAFF from "../../services/staffService";
import {toast} from "react-toastify";
import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {FormattedDate} from "react-intl";
import avt from "../../assets/images/avt.png";


const Profile = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [avtUrl, setAvtUrl] = useState("");

    const fetchData = async () => {
        try {
            const res = await STAFF.getRole();
            if (res.status === 200) {
                setData(res.data);
                setEmail(res.data.email);
                setName(res.data.name);
                setAvtUrl(res.data.avatar);
                console.log(res.data);
            } else {
                toast.error("Không thể tải profile");
            }
        } catch (e) {
            toast.error("Không thể tải profile");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async () => {
        try {
            const res = await STAFF.updateProfile({name, file});
            if (res.status === 200) {
                toast.success("Cập nhật profile thành công");
                fetchData();
            } else {
                toast.error(res.data.message);
            }
        } catch (e) {
            toast.error("Cập nhật profile thât baị, vui lòng thể thử lại sau");
        }
    }

    const hanleCancel = () => {
        setName(data.name);
        setFile(null);
        setEmail(data.email);
    }

    return (
        <div>
            <div className="bg-white overflow-hidden shadow rounded-lg border w-1/2 m-auto">
                <div className="flex items-center justify-between">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Hồ sơ
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Thông tin tài khoản
                        </p>
                    </div>
                    <div className="px-4 py-5 sm:px-6 relative">
                        {file ? (
                            <img className="h-20 w-20 rounded-full"
                                 src={URL.createObjectURL(file)} alt=""/>
                        ) : (
                            <img className="h-20 w-20 rounded-full"
                                 src={avtUrl ? avtUrl : avt} alt=""/>
                        )}
                        <input
                            type="file"
                            className="absolute bg-white rounded-full top-5 left-6 w-20 h-20 opacity-0 hover:cursor-pointer"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Địa chỉ email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {email}
                        </dd>
                    </div>
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Họ và tên
                            </dt>
                            <dd className="mt-1 h-8 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input className="h-full focus:outline-gray-300 hover:outline-gray-300 w-full"
                                       value={name} onChange={(e) => setName(e.target.value)}/>
                            </dd>
                        </div>
                    </dl>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Cập nhật lần cuối
                        </dt>
                        <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">
                            <FormattedDate value={data.updated_at}
                                           year="numeric"
                                           month="long"
                                           day="numeric"
                                           hour="numeric"
                                           minute="numeric"
                            />
                        </dd>
                    </div>
                </div>
                <div className={`flex ml-5 gap-2 my-2`}>
                    <Button variant="contained" onClick={handleSave}>Cập nhật</Button>
                    <Button
                        onClick={hanleCancel}
                    >Hủy</Button>
                </div>
            </div>
        </div>
    )
}

export default Profile;