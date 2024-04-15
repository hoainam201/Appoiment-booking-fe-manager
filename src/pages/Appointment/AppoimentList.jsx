import React, {useEffect, useState} from 'react';
import {Table, Tag, Button} from 'antd';
import "./style.css"
import {format} from 'date-fns';
import {bookingStatus} from "../../utils/constant";


const columns = [
    {
        title: 'Họ và tên',
        dataIndex: 'name',
        key: 'name',
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
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'create',
        key: 'create',
        sorter: (a, b) => new Date(a.create) - new Date(b.create),
    },
    {
        title: 'Trạng thái',
        key: 'state',
        dataIndex: 'state',
        render: (_, {state}) => (
            <>
                {
                    <Tag color={bookingStatus[state].color}>
                        {bookingStatus[state].name}
                    </Tag>
                }
            </>
        ),
    },
    {
        title: 'Lựa chọn',
        key: 'action',
        render: (_, {state}) => {
            switch (state) {
                case 0:
                    return (
                        <>
                            <Button shape="round">Xác nhận</Button>
                            <Button shape="round" danger>Từ chối</Button>
                        </>
                    )
                case 1:
                    return (
                        <>
                            <Button shape="round">Kết thúc</Button>
                            <Button shape="round" danger>Hủy khám</Button>
                        </>
                    )
                default:
                    return (
                        <div className="gap-2">
                            <Button shape="round" disabled={true}>Xác nhận</Button>
                            <Button shape="round" danger disabled={true}>Từ chối</Button>
                        </div>
                    )
            }
        },
    },
];


function randomDate(startDate, endDate) {
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    return new Date(randomTime);
}

// Hàm để tạo ngày ngẫu nhiên theo format dd/mm/yy
function randomFormattedDate() {
    const startDate = new Date(2000, 0, 1); // Ngày bắt đầu
    const endDate = new Date(); // Ngày hiện tại
    const randomDt = randomDate(startDate, endDate);
    return format(randomDt, 'dd/MM/yy');
}

function generateRandomName(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Sử dụng hàm để lấy ngày ngẫu nhiên
const randomDateString = randomFormattedDate();

const data = [];

for (let i = 1; i < 500; i++) {
    data.push({
        key: i.toString(),
        name: generateRandomName(9),
        dob: randomDateString,
        phone: '0123456789',
        time: `8:00 ${randomDateString}`,
        create: `8:00 ${randomDateString}`,
        state: i % 5,
    });
}
const AppointmentList = () => {
    const [state, setState] = useState('-1');
    const [filteredData, setFilteredData] = useState(data);
    const [search, setSearch] = useState('');


    useEffect(() => {
        setFilteredData(data);
        if (state != '-1' && search != '') {
            setFilteredData(data.filter((item) => (item.state == state && item.name.toLowerCase().includes(search.trim().toLowerCase()))));
        } else if (search != '') {
            setFilteredData(data.filter((item) => item.name.toLowerCase().includes(search.trim().toLowerCase())));
        } else if (state != '-1') {
            setFilteredData(data.filter((item) => item.state == state));
        }
    }, [state, search]);


    return (
        <div className="table-h">
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
                <select
                    value={state}
                    onChange={(e) => {
                        console.log(e.target.value)
                        setState(e.target.value)
                    }}
                    className={`border border-gray-300 hover:border-gray-500 rounded-lg p-2`}>
                    <option value="-1">Tat ca</option>
                    {bookingStatus.map((item) => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <Table columns={columns} dataSource={filteredData} pagination={{pageSize: 7}}/>
        </div>
    );
};
export default AppointmentList;