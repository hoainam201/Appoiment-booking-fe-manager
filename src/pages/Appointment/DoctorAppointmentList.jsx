import React, {useEffect, useState} from 'react';
import {Table, Tag, Button} from 'antd';
import "./style.css";
import {format} from 'date-fns';
import {bookingStatus} from "../../utils/constant";
import STAFF from "../../services/staffService";
import {toast} from "react-toastify";
import {FormattedDate} from "react-intl";
import {useNavigate} from "react-router-dom";




const DoctorAppointmentList = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await STAFF.doctorAppointment();
            if(response.status === 200) {
                console.log(response.data);
                setData(response.data);
                setFilteredData(response.data);
            } else {
                toast.error("Vui lòng thử lại sau");
            }
        } catch (error) {
            toast.error("Vui lòng thử lại sau");
        }
    };


    const hanldeReject = async (id) => {
        try {
            const res = await STAFF.rejectBooking(id);
            if(res.status === 200) {
                toast.dismiss();
                toast.success("Đã xác nhận");
                fetchData();
            } else {
                toast.error(res.data.message);
            }
        } catch (e){
            toast.error("Vui là thử lại sau");
        }
    }


    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'service_name',
            key: 'service_name',
            fixed: 'left',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Thời gian khám',
            dataIndex: 'time',
            key: 'time',
            sorter: (a, b) => new Date(a.time) - new Date(b.time),
            render: (text) => <FormattedDate value={text}
                                             year="numeric"
                                             month="long"
                                             day="numeric"
                                             hour="numeric"
                                             minute="numeric"/>
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
            render: (text) => <FormattedDate value={text}
                                             year="numeric"
                                             month="long"
                                             day="numeric"
                                             hour="numeric"
                                             minute="numeric"/>
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            filter: true,
            filters: bookingStatus.map(status => ({text: status.name, value: status.id})),
            onFilter: (value, record) => record.status === value,
            render: (_, {status}) => (
                <>
                    {
                        <Tag color={bookingStatus[status].color}>
                            {bookingStatus[status].name}
                        </Tag>
                    }
                </>
            ),
        },
        {
            title: 'Lựa chọn',
            key: 'action',
            width: 250,
            fixed: 'right',
            render: (_, {status, id, facility_review_id, service_review_id}) => {
                return (
                    <Button
                        shape="round"
                        size="large"
                        onClick={() => navigate("/appointment/detail/" + id)}
                    >
                        Chi tiết
                    </Button>
                )
            },
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        setFilteredData(data);
        if (search != '') {
            setFilteredData(data.filter((item) => item.name.toLowerCase().includes(search.trim().toLowerCase())
                || item.service_name.toLowerCase().includes(search.trim().toLowerCase())
                || item.phone.toLowerCase().includes(search.trim().toLowerCase()) ));
        }
    }, [search]);


    return (
        <div className="table-h overflow-auto">
            <div className="w-full flex h-10 my-auto justify-start gap-3">
                <div className="w-28 text-center my-auto font-bold">Tên bệnh nhân</div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                    className={`w-1/3 h-full border border-gray-300 hover:border-gray-500 rounded-lg p-2`}
                />
            </div>
            <Table
                scroll={{x: 1500}}
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20'],
            }}/>
        </div>
    );
};
export default DoctorAppointmentList;