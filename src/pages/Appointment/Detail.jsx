import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {toast} from "react-toastify";
import IconButton from "@mui/material/IconButton";
import {useParams} from "react-router-dom";
import STAFF from "../../services/staffService";
import {FormattedDate} from "react-intl";

const exdata = [
    {
        drug: "Naproxen",
        quantity: 3,
        instruction: "Naproxen 500mg",
    },
    {
        drug: "Naproxen",
        quantity: 3,
        instruction: "Naproxen 500mg",
    },
    {
        drug: "Naproxen",
        quantity: 3,
        instruction: "Naproxen 500mg",
    },
]

const Detail = () => {
    const [data, setData] = useState(null);
    const [drug, setDrug] = useState("");
    const [quantity, setQuantity] = useState("");
    const [instruction, setInstruction] = useState("");
    const id = useParams();

    const fetchData = async () => {
        try {
            const response = await STAFF.getAppointmentDetail(id.id);
            if(response.status === 200) {
                console.log(response.data);
                setData(response.data);
            } else {
                toast.dismiss();
                toast.error("Vui lòng thử lại sau");
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Vui lòng thử lại sau");
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: 'Tên thuốc',
            dataIndex: 'drug',
            key: 'drug',
            fixed: 'left',
            width: 200,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Liều dùng',
            dataIndex: 'instruction',
            key: 'instruction',
            // width: 300,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (id) => {
                return (
                    <IconButton
                        color="error"
                        onClick={() => {
                            toast.error("!!!!")
                        }}

                    >
                        <RemoveIcon/>
                    </IconButton>
                )
            }
        }
    ]


    return (
        <div className="flex flex-col h-[75vh] overflow-y-auto gap-2">
            <div className="flex justify-between">
                <Button
                    sx={{
                        mr: 1,
                        textTransform: "none",
                    }}
                    onClick={() => window.history.back()}
                    variant="text"
                    startIcon={<ArrowBackIosIcon/>}
                >Quay lại</Button>
                <h1 className={`text-3xl font-bold text-center`}>Thông tin</h1>
                <Button
                    sx={{
                        mr: 1,
                        textTransform: "none",
                    }}
                    onClick={() => {
                    }}
                    variant="contained"
                    startIcon={<AddIcon/>}
                >Bắt đầu khám</Button>
            </div>
            <div className={`flex items-center h-12 w-full justify-between`}>
                <p className={`text-xl font-bold text-center`}>
                    Tên bệnh nhân
                </p>
                <div className={`flex ml-2 mt-1`}>
                    <p>
                        {data?.name}
                    </p>
                </div>
            </div>
            <hr/>
            <div className={`flex items-center h-12 w-full justify-between`}>
                <p className={`text-xl font-bold text-center`}>
                    Dịch vụ khám
                </p>
                <div className={`flex ml-2 mt-1`}>
                    <p>
                        {data?.service.name}
                    </p>
                </div>
            </div>
            <hr/>
            <div className={`flex items-center h-12 w-full justify-between`}>
                <p className={`text-xl font-bold text-center`}>
                    Ngày tháng năm sinh
                </p>
                <div className={`flex ml-2 mt-1`}>
                    <p>
                        <FormattedDate value={data?.dob} year="numeric" month="long" day="numeric" />
                    </p>
                </div>
            </div>
            <hr/>
            <div className={`flex items-center h-12 w-full justify-between`}>
                <p className={`text-xl font-bold text-center`}>
                    Thời gian đăng ký khám
                </p>
                <div className={`flex ml-2 mt-1`}>
                    <p>
                        <FormattedDate value={data?.time} year="numeric" month="long" day="numeric" hour="numeric" minute="numeric" />
                    </p>
                </div>
            </div>
            <hr/>
            <div className={`flex items-center h-12 w-full justify-between`}>
                <p className={`text-xl font-bold text-center`}>
                    Số điện thoại
                </p>
                <div className={`flex ml-2 mt-1`}>
                    <p>
                        {data?.phone}
                    </p>
                </div>
            </div>
            <hr/>
            <div className={`flex flex-col items-start`}>
                <p className={`text-xl font-bold`}>Chẩn đoán</p>
                <input
                    // disabled
                    className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                    type="text"
                    placeholder="Chẩn đoán"
                    // value={name}
                    onChange={() => {
                    }}
                />
            </div>
            <div className={`flex flex-col items-start`}>
                <p className={`text-xl font-bold`}>Toa thuốc</p>
                <div className="flex w-full">

                    <input
                        // disabled
                        className={`w-[200px] outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                        type="text"
                        placeholder="Chẩn đoán"
                        // value={name}
                        onChange={() => {
                        }}
                    />
                    <input
                        // disabled
                        className={`w-[100px] outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                        type="text"
                        placeholder="Chẩn oán"
                        // value={name}
                        onChange={() => {
                        }}
                    />
                    <input
                        // disabled
                        className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                        type="text"
                        placeholder="Chẩn oán"
                        // value={name}
                        onChange={() => {
                        }}
                    />
                    <div className={`w-[100px]`}>
                        <IconButton
                            color="primary"
                            onClick={() => {
                            }}
                        >
                            <AddIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={exdata}
                scroll={{
                    x: 800,
                    y: 500,
                }}
            />

        </div>
    )
}
export default Detail;