import React, {useEffect, useState} from 'react';
import {Table, Tag} from "antd";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {FormattedDate} from "react-intl";

import STAFF from "../../services/staffService";
import {toast} from "react-toastify";
import {facilityType} from "../../utils/constant";

const List = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/facility/detail/${id}`);
    }

    const handleActive = async (id) => {
        let res = await STAFF.activeFacility(id);
        if(res.status === 200) {
            toast.dismiss();
            toast.success(res.data.message);
            data.forEach((item) => {
                if(item.id === id) {
                    item.active = !item.active;
                }
            });
            setData([...data]);
        } else {
            toast.error(res.data.message);
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Tên cơ sở',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
            fixed: 'left',
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            width: 150,
            filters: facilityType.map( ({id, name}) => ({text: name, value: id})),
            onFilter: (value, record) => record.type === value,
            render: (_, {type}) => <Tag color={facilityType.find(({id}) => id === type)?.color}>{facilityType.find(({id}) => id === type)?.name}</Tag>, // <Tag color={status ? "green" : "red"}>{status ? "Hiện" : "Chủ biểt"}</>,
        },
        {
            title: 'Trang thái',
            dataIndex: 'active',
            key: 'active',
            width: 150,
            filters: [
                {
                    text: 'Hoạt động',
                    value: true,
                },
                {
                    text: 'Dừng',
                    value: false,
                }
            ],
            onFilter: (value, record) => record.status === value,
            render: (_, {active}) => <>{active ? <Tag color="green">Hoạt động</Tag> : <Tag color="red">Dừng</Tag>}</>,
        },
        {
            title: 'Đánh giá',
            dataIndex: 'avg_rating',
            key: 'avg_rating',
            // width: 100,
            render: (text)   => <>{text}</>,
            sorter: (a, b) => a.avg_rating - b.avg_rating,
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
            width: 300,
            key: 'active, id',
            render: (_, {active, id}) => {
                return (
                    <>
                        <Button
                            variant="contained"
                            onClick={() => handleEdit(id)}>Chi tiết</Button>
                        <Button
                            variant="outlined"
                            onClick={() => handleActive(id)}
                            style={{marginLeft: "10px"}}>{active ? "Dừng" : "Kích hoạt"}</Button>
                    </>
                )
            }
        }
    ]

    const fetchData = async () => {
        try {
            const res = await STAFF.getFacilities();
            if(res.status === 200) {
                console.log(res.data);
                setData(res.data);
                setFilteredData(res.data);
            }else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (search !== '') {
            setFilteredData(data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())));
        } else {
            setFilteredData(data);
        }
    }, [search]);

    return (
        <div className="max-h-[75vh] overflow-y-auto relative">
            <div className="w-full flex h-10 my-auto justify-start gap-3 sticky top-0 z-10 bg-white mb-2">
                <div className="w-28 text-center my-auto font-bold">Tên cơ sở</div>
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
                        navigate("/facility/create")
                    }}
                    variant="contained"
                >Thêm cơ sở</Button>
            </div>
            <Table
                columns={columns} d
                dataSource={filteredData}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20'],
                }}
                scroll={{
                x: 1500
            }}/>
        </div>
    )
}

export default List;