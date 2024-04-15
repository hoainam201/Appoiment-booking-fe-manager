import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {toast} from "react-toastify";
import STAFF from "../../services/staffService";

const Change = () => {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const token = useMemo(() => localStorage.getItem('token'), []);

    useEffect(() => {
            if (!token) {
                navigate('/Login');
            }
        },
        [navigate, token]
    );

    const handleSave = async () => {
        try {
            if (!oldPassword || !newPassword || !confirmPassword) {
                toast.error('Vui lòng điền đầy đủ thông tin');
                return;
            }
            if(newPassword !== confirmPassword) {
                toast.error('Mật khẩu xác nhận không đúng');
                return;
            }
            const res = await STAFF.changePassword({
                oldPassword: oldPassword,
                newPassword: newPassword,
            })
            if (res.status === 200) {
                toast.success('Cập nhật thành công');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            // toast.error('Cập nhật thất bại');
            console.error(error);
        }
    }


    return (
        <div>
            <div className="bg-white overflow-hidden shadow rounded-lg border w-1/2 m-auto">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Đổi mật khẩu
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Cập nhật mật khâu
                    </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Mật khẩu cũ
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={(e) => setOldPassword(e.target.value)}/>
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Mật khẩu mới
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={(e) => setNewPassword(e.target.value)}/>
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Xác nhận mật khẩu mới
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className={`flex ml-5 gap-2 my-2`}>
                    <Button variant="contained" onClick={handleSave}>Cập nhật</Button>
                </div>
            </div>
        </div>
    );

};

export default Change;