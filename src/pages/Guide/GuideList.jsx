import React, {useEffect, useState} from 'react';
import {bookingStatus, guideStatus} from "../../utils/constant";
import {Table, Tag} from "antd";
import {Button} from "@mui/material";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";
import {FormattedDate} from "react-intl";

import STAFF from "../../services/staffService";


const columns = [
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text)=><FormattedDate value={text}
                                       year="numeric"
                                       month="long"
                                       day="numeric"
                                       hour="numeric"
                                       minute="numeric"
        />,
    },
    {
        title: 'Hành động',
        dataIndex: 'status',
        key: 'status',
            render:(_, {status}) => {
                if(status === true) {
                    return (
                        <>
                            <Button>Ẩn</Button>
                            <Button variant="contained">Chỉnh sửa</Button>
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Button>Hiện</Button>
                            <Button variant="contained">Chỉnh sửa</Button>
                        </>
                    )
                }
            }
    }
]



const GuideList = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('1');
    const [state, setState] = useState('0');
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await STAFF.getGuide();
            setData(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="h-[75vh]">
            <div className="w-full flex h-10 my-auto justify-start gap-3">
                <div className="w-28 text-center my-auto font-bold">Tiêu đề</div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                    className={`w-1/3 h-full border border-gray-300 hover:border-gray-500 rounded-lg p-2`}
                />
                <select
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value)
                    }}
                    className={`border border-gray-300 hover:border-gray-500 rounded-lg p-2`}>
                    <option value="1">Mới</option>
                    <option value="2">Cũ</option>
                </select>
                <Button
                    onClick={() => {
                        navigate("/guide/create")
                    }}
                    variant="contained"
                >Tạo bài viết</Button>
            </div>
            <Table columns={columns} dataSource={data} pagination={{pageSize: 6}}/>
        </div>
    )
}

export default GuideList;