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
import {bookingStatus} from "../../utils/constant";


const Detail = () => {
    const [data, setData] = useState(null);
    const [drug, setDrug] = useState("");
    const [quantity, setQuantity] = useState("");
    const [instruction, setInstruction] = useState("");
    const id = useParams();
    const [prescription, setPrescription] = useState(null);
    const [description, setDescription] = useState("");

    const fetchPrescription = async () => {
        try {
            const res = await STAFF.getPrescription(id.id);
            if (res.status === 200) {
                console.log(res.data)
                setPrescription(res.data);
            } else {
                toast.dismiss();
                toast.error(res.data.message);
            }
        } catch (e) {
            toast.dismiss();
            toast.error("Vui lòng thử lại sau!");
        }
    }

    const handleSave = async () => {
        try {
            toast.dismiss();
            toast.loading("Đang lưu");
            const res = await STAFF.saveDiagnosis(data?.diagnosis_id, description.trim());
            if (res.status === 200) {
                toast.dismiss();
                toast.success("Đã lưu");
                fetchData();
            } else {
                toast.dismiss();
                toast.error(res.data.message);
            }
        } catch (e) {
            toast.dismiss();
            toast.error("Vui lòng thử lại sau!");
        }

    }

    const hanldeStart = async () => {
        try {
            toast.dismiss();
            toast.loading("Đang sửa thanh cách");
            const res = await STAFF.startBooking(id.id);
            if (res.status === 200) {
                toast.dismiss();
                toast.success("Đã xác nhận");
                fetchData();
            } else {
                // toast.dismiss();
                toast.error(res.data.message);
            }
        } catch (e) {
            toast.dismiss();
            toast.error("Vui lòng thử lại sau!");
        }
    }

    const handleComplete = async () => {
        try {
            toast.dismiss();
            toast.loading("Đang hoàn thanh cách");
            const res = await STAFF.completeBooking(id.id);
            if (res.status === 200) {
                toast.dismiss();
                toast.success("Đã hoàn thanh cách");
                fetchData();
            } else {
                toast.dismiss();
                toast.error(res.data.message);
            }
        } catch (e) {
            toast.dismiss();
            toast.error("Vui là thử được!");
        }
    }

    const handleAddDrug = async () => {
        try {
            if (drug.trim() === "" || quantity.trim() === "" || instruction.trim() === "") {
                toast.dismiss();
                toast.error("Vui lòng điền đầy đủ");
                return;
            }
            if (!data.diagnosis_id) {
                toast.dismiss();
                toast.error("Vui lòng thử lại sau");
                return;
            }
            toast.dismiss();
            toast.loading("Đang thêm thuốc");
            const res = await STAFF.addDrug({
                diagnosis_id: data.diagnosis_id,
                drug: drug.trim(),
                quantity: quantity.trim(),
                instruction: instruction.trim(),
            });
            setDrug("");
            setQuantity("");
            setInstruction("");
            if (res.status === 200) {
                toast.dismiss();
                toast.success("Đã thêm");
                fetchData();
            } else {
                toast.dismiss();
                toast.error(res.data.message);
            }
        } catch (e) {
            setDrug("");
            setQuantity("");
            setInstruction("");
            toast.dismiss();
            toast.error("̉Vui lòng thử lại sau");
        }
    }

    const handleRemoveDrug = async (id) => {
        try {
            toast.dismiss();
            toast.loading("Đang xoá thuốc");
            const res = await STAFF.removeDrug(id);
            if (res.status === 200) {
                toast.dismiss();
                toast.success("Đã xoá");
            } else {
                toast.dismiss();
                toast.error("̉Vui lòng thử lại sau");
            }
            fetchData();
        } catch (e) {
            toast.dismiss();
            toast.error("Vui lòng thử lại sau");
        }
    }

    const fetchData = async () => {
        try {
            const index = id.id;
            const response = await STAFF.getAppointmentDetail(index);
            if (response.status === 200) {
                setData(response.data);
                if (response.data.diagnosis) {
                    setDescription(response.data.diagnosis.description);
                    fetchPrescription();
                }
            } else {
                toast.dismiss();
                toast.error("Vui lòng thử lại sau");
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Vui lòng thử lại sau1");
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
            render: (_, {id}) => {
                return (
                    <IconButton
                        color="error"
                        onClick={() => handleRemoveDrug(id)}
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
                <h1 className="text-3xl font-bold text-center">Thông tin</h1>
                {data?.status !== 1 ?
                    <Button
                        sx={{
                            mr: 1,
                            textTransform: "none",
                        }}
                        disabled={data?.status !== 5}
                        onClick={handleComplete}
                        variant="contained"
                    >Kết thúc khám</Button> : <Button
                        sx={{
                            mr: 1,
                            textTransform: "none",
                        }}
                        onClick={hanldeStart}
                        variant="contained"
                    >Bắt đầu khám</Button>}
            </div>
            <div className="flex items-center h-12 w-full justify-between">
                <p className="text-xl font-bold text-center">
                    Tên bệnh nhân
                </p>
                <div className="flex ml-2 mt-1">
                    <p>
                        {data?.name}
                    </p>
                </div>
            </div>
            <hr/>
            <div className="flex items-center h-12 w-full justify-between">
                <p className="text-xl font-bold text-center">
                    Dịch vụ khám
                </p>
                <div className="flex ml-2 mt-1">
                    <p>
                        {data?.service.name}
                    </p>
                </div>
            </div>
            <hr/>
            <div className="flex items-center h-12 w-full justify-between">
                <p className="text-xl font-bold text-center">
                    Ngày tháng năm sinh
                </p>
                <div className="flex ml-2 mt-1">
                    <p>
                        <FormattedDate value={data?.dob} year="numeric" month="long" day="numeric"/>
                    </p>
                </div>
            </div>
            <hr/>
            <div className="flex items-center h-12 w-full justify-between">
                <p className="text-xl font-bold text-center">
                    Thời gian đăng ký khám
                </p>
                <div className="flex ml-2 mt-1">
                    <p>
                        <FormattedDate value={data?.time} year="numeric" month="long" day="numeric" hour="numeric"
                                       minute="numeric"/>
                    </p>
                </div>
            </div>
            <hr/>
            <div className="flex items-center h-12 w-full justify-between">
                <p className="text-xl font-bold text-center">
                    Số điện thoại
                </p>
                <div className="flex ml-2 mt-1">
                    <p>
                        {data?.phone}
                    </p>
                </div>
            </div>
            <hr/>
            {data?.diagnosis &&
                <div className="flex flex-col items-start">
                    <div className="flex w-full justify-between">
                        <p className="text-xl font-bold">Chẩn đoán</p>
                        <Button
                            size="small"
                            disabled={description.length === 0 || description.trim() === data?.diagnosis.description}
                            onClick={handleSave}>Lưu</Button>
                    </div>
                    <textarea
                        className="w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500"
                        placeholder="Chẩn đoán"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                </div>
            }
            {data?.status === 5 && <div className="flex flex-col items-start">
                <p className="text-xl font-bold">Toa thuốc</p>
                <div className="flex w-full">

                    <input
                        // disabled
                        className="w-[200px] outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500"
                        type="text"
                        placeholder="Thuốc 1"
                        value={drug}
                        onChange={event => setDrug(event.target.value)}
                    />
                    <input
                        className="w-[100px] outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500"
                        type="text"
                        placeholder="Số lượng"
                        value={quantity}
                        onChange={event => setQuantity(event.target.value)}
                    />
                    <input
                        // disabled
                        className="w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500"
                        type="text"
                        placeholder="Hướng dẫn sử dụng"
                        value={instruction}
                        onChange={event => setInstruction(event.target.value)}
                    />
                    <div className="w-[100px]">
                        <IconButton
                            color="primary"
                            onClick={() => handleAddDrug()}
                        >
                            <AddIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
            }

            <Table
                columns={columns}
                dataSource={prescription}
                scroll={{
                    x: 800,
                    y: 500,
                }}
            />


        </div>
    )
}
export default Detail;