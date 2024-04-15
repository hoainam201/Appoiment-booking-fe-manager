import React, {useState, useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import {toast} from "react-toastify";

import STAFF from "../../services/staffService";
import {isValidEmail} from "../../utils/validate";

export default function Login() {
    const navigate = useNavigate();
    const token = useMemo(() => localStorage.getItem('token'), []);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
            if (token) {
                navigate('/');
            }
        },
        [token]
    );

    const handleLogin = async () => {
        if (email && password) {
            if (!isValidEmail(email)) {
                toast.error("Email không đúng định dạng");
                return;
            }
            const res = await STAFF.login({email, password});
            if (res && res.data && res.data.token) {
                localStorage.setItem('token', res.data.token);
                toast.success("Đăng nhập thành công");
                navigate('/');
            } else {
                toast.error("Tài khoản hoặc mật khẩu không đúng");
            }
        } else {
            toast.error('Vui lòng điền đầy đủ thông tin');
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-16 w-auto"
                        src={Logo}
                        alt="HealthPro"
                    />
                    <h2 className=" text-center text-blue-500 text-2xl font-bold leading-9 tracking-tight">
                        HealthPro
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div     className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    placeholder="aEjyN@example.com"
                                    onChange={e => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Mật khẩu
                                </label>
                                <div className="text-sm">
                                    <button className="font-semibold text-indigo-600 hover:text-indigo-500"
                                            onClick={() => navigate('/forgot-password')}>
                                        Quên mật khẩu
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleLogin}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
