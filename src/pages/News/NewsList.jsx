import React, {useEffect, useState} from 'react';
import {Table, Tag} from "antd";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {FormattedDate} from "react-intl";

import STAFF from "../../services/staffService";
import {toast} from "react-toastify";


const NewsList = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const navigate = useNavigate();

    const handleShow = async (id) => {
        const res = await STAFF.showGuide(id);
        if (res.status === 200) {
            toast.success("Cập nhật trạng thái thành công");
            data.map((item) => {
                if (item.id === id) {
                    item.status = !item.status;
                }
            });
            setData([...data]);
        } else {
            toast.error("Cập nhật trạng thái thất bại");
        }
    }

    const handleHide = async (id) => {
        const res = await STAFF.hideGuide(id);
        if (res.status === 200) {
            toast.success("Cập nhật trạng thái thành công");
          data.map((item) => {
            if (item.id === id) {
              item.status = !item.status;
            }
          });
          setData([...data]);
        } else {
            toast.error("Cập nhật trạng thái thất bại");
        }
    }

    const handleEdit = (id) => {
        navigate(`/news/edit/${id}`);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Trang thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            filters: [
                {
                    text: 'Hiện',
                    value: true,
                },
                {
                    text: 'Ẩn',
                    value: false,
                }
            ],
            onFilter: (value, record) => record.status === value,
            render: (_, {status}) => <>{status ? <Tag color="green">Hiện</Tag> : <Tag color="red">Ẩn</Tag>}</>, // <Tag color={status ? "green" : "red"}>{status ? "Hiện" : "Chủ biểt"}</>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 250,
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
            render: (text) => <FormattedDate value={text}
                                             year="numeric"
                                             month="long"
                                             day="numeric"
                                             hour="numeric"
                                             minute="numeric"
            />,
        },
        {
            title: 'Cập nhật lần cuối',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: 250,
            sorter: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
            render: (text) => <FormattedDate value={text}
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
            fixed: 'right',
            width: 250,
            key: 'status, id',
            render: (_, {status, id}) => {
                if (status === true) {
                    return (
                        <>
                            <Button
                                sx={{marginRight: 1}}
                                variant="outlined"
                                onClick={() => handleHide(id)}
                            >ẩn</Button>
                            <Button
                                variant="contained"
                                onClick={() => handleEdit(id)}>Chỉnh sửa</Button>
                        </>
                    )
                } else {
                    return (
                        <div>
                            <Button
                                sx={{marginRight: 1}}
                                variant="outlined"
                                onClick={() => handleShow(id)}>Hiện</Button>
                            <Button
                                variant="contained"
                                onClick={() => handleEdit(id)}>Chỉnh sửa</Button>
                        </div>
                    )
                }
            }
        }
    ]

    const fetchData = async () => {
        try {
            const res = await STAFF.getGuide();
            setData(res.data);
            setFilteredData(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {

        if (search !== '') {
            setFilteredData(data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())));
        } else {
            setFilteredData(data);
        }
    }, [search]);

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
                <Button
                    onClick={() => {
                        navigate("/news/create")
                    }}
                    variant="contained"
                >Tạo bài viết</Button>
            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20'],
                }}/>
        </div>
    )
}

export default NewsList;