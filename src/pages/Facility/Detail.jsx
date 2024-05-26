import React, {useEffect, useState} from "react"
import Viewer from "../../components/Editor/Viewer"
import "../../components/Editor/style.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {specialitiesL, staffRole, facilityType} from "../../utils/constant";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import LeafletMap from "../../components/Map/LeafletMap";
import STAFF from "../../services/staffService";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from '@mui/icons-material/Add';

const initialMarkdownContent = "**Empty**..."


export default function Create() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [speciality, setSpeciality] = useState(specialitiesL[0].id);
    const [type, setType] = useState(facilityType[0].id);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState(initialMarkdownContent);
    const [avt, setAvt] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [data, setData] = useState([]);
    const [staffEmail, setStaffEmail] = useState('');
    const [staffName, setStaffName] = useState('');
    const [role, setRole] = useState(staffRole.DOCTOR);
    const params = useParams();


    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setStaffEmail('');
        setStaffName('');
        setRole(staffRole.DOCTOR);
    };


    const handleSave = async () => {
        try {
            if (!name) {
                toast.dismiss();
                toast.error("Vui lòng điền đầy đủ thông tin");
                return;
            }
            toast.dismiss();
            toast.loading("Đang thêm nhân viên");
            const res = await STAFF.createManager({
                id: params.id,
                name: staffName,
                email: staffEmail,
            });
            if (res.status === 201) {
                toast.dismiss();
                toast.success("Thêm nhân viên thành công");
                fetchData();
                handleClose();
            } else {
                toast.dismiss();
                toast.error(res.data.message);
            }
        } catch (e) {
            toast.dismiss();
            toast.error("Thêm nhan viên thât baị, vui lòng thể thử lại sau");
        }
    }

    const handleCancel = () => {
        navigate("/facility");
    }

    const fetchData = async () => {
        try {
            const res = await STAFF.getFacilityById(params.id);
            if (res.status === 200) {
                console.log(res.data);
                setData(res.data);
                setName(res.data.name);
                setAddress(res.data.address);
                setSpeciality(res.data.specialities);
                setType(res.data.type);
                setPhone(res.data.phone);
                setEmail(res.data.email);
                setDescription(res.data.description);
                setAvt(res.data.avatar);
                setLat(res.data.latitude);
                setLng(res.data.longitude);
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (e) {
            toast.error(e.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="flex flex-col max-h-[75vh] overflow-y-auto">
            <div className="flex justify-between">
                <Button
                    sx={{
                        mr: 1,
                        textTransform: "none",
                    }}
                    onClick={handleCancel}
                    variant="text"
                    startIcon={<ArrowBackIosIcon/>}
                >Quay lại</Button>
                <h1 className={`text-3xl font-bold text-center`}>Thông tin cơ sở</h1>
                <Button
                    sx={{
                        mr: 1,
                        textTransform: "none",
                    }}
                    onClick={handleClickOpen}
                    variant="contained"
                    startIcon={<AddIcon/>}
                >Thêm quản lý</Button>
            </div>
                <div className={`flex flex-col items-start`}>
                    <p className={`text-xl font-bold`}>Ảnh</p>
                    <div className="relative w-full">
                        <img
                            className={`h-32 w-auto rounded-lg`}
                            src={avt ? avt : "https://via.placeholder.com/150"}
                            alt="avatar"
                        />
                    </div>
                </div>
                <div className={`flex flex-col items-start`}>
                    <p className={`text-xl font-bold`}>Tên cơ sở</p>
                    <input
                        disabled={true}
                        className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                        type="text"
                        placeholder="Tên cơ sở"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className={`flex flex-col items-start`}>
                    <p className={`text-xl font-bold`}>Số điện thoại</p>
                    <input
                        disabled={true}
                        className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                        type="text"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <div className={`flex flex-col items-start`}>
                    <p className={`text-xl font-bold`}>Email</p>
                    <input
                        disabled={true}
                        className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className={`flex flex-col items-start relative`}>
                    <p className={`text-xl font-bold`}>Địa chỉ</p>
                    <input
                        disabled={true}
                        className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                        type="text"
                        placeholder="Địa chỉ"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>
                {lat !== 0 && lng !== 0 && <div className={`flex flex-col items-start`}>
                    <div
                        className="flex items-center justify-center h-[300px] w-full "
                    >
                        {lat && lng ? <LeafletMap lat={lat} lng={lng}/> : <></>}
                    </div>
                </div>}
                <div className={`flex flex-col items-start`}>
                    <FormControl
                        variant="standard"
                        disabled
                    >
                        <InputLabel htmlFor="demo-simple-select-label1">Loại hình</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select"
                            variant="standard"
                            sx={{
                                marginTop: 5,
                                maxHeight: 300,
                                width: 250,
                            }}
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            {facilityType.map((item, index) => (
                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={`flex flex-col items-start`}>
                    <FormControl
                        variant="standard"
                        disabled
                    >
                        <InputLabel htmlFor="demo-simple-select-label2">Chuyên khoa</InputLabel>
                        <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select"
                            variant="standard"
                            sx={{
                                marginTop: 5,
                                width: 250,
                            }}
                            MenuProps={
                                {
                                    PaperProps: {
                                        style: {
                                            maxHeight: 200,
                                            width: 250,
                                        },
                                    },
                                }
                            }
                            value={speciality}
                            onChange={(e) => setSpeciality(e.target.value)}
                        >
                            {specialitiesL.map((item, index) => (
                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>


                <div className={`flex items-center h-12 w-full justify-start`}>
                    <p className={`text-xl font-bold text-center`}>
                        Mô tả
                    </p>
                </div>
                <div className="viewer max-h-[300px] rounded-lg">
                    <Viewer value={description}/>
                </div>
                {data.avg_rating && <div className={`flex items-center h-12 w-full justify-between`}>
                    <p className={`text-xl font-bold text-center`}>
                        Đánh giá trung bình
                    </p>
                    <div className={`flex ml-2 mt-1 justify-end`}>
                        <p>
                            {data.avg_rating}
                        </p>
                    </div>
                </div>}
                {data && <div className={`flex items-center h-12 w-full justify-between`}>
                    <p className={`text-xl font-bold text-center`}>
                        Số lượng dịch vụ
                    </p>
                    <div className={`flex ml-2 mt-1 justify-end`}>
                        <p>
                            {data.services}
                        </p>
                    </div>
                </div>}
                {data && <div className={`flex items-center h-12 w-full justify-between`}>
                    <p className={`text-xl font-bold text-center`}>
                        Số lượng nhân viên
                    </p>
                    <div className={`flex ml-2 mt-1 justify-end`}>
                        <p>
                            {data.staffs}
                        </p>
                    </div>
                </div>}
                {data && <div className={`flex items-center h-12 w-full justify-between`}>
                    <p className={`text-xl font-bold text-center`}>
                        Số lượt đặt khám
                    </p>
                    <div className={`flex ml-2 mt-1 justify-end`}>
                        <p>
                            {data.books}
                        </p>
                    </div>
                </div>}
                {data && <div className={`flex items-center h-12 w-full justify-between`}>
                    <p className={`text-xl font-bold text-center`}>
                        Số lượt đánh giá
                    </p>
                    <div className={`flex ml-2 mt-1 justify-end`}>
                        <p>
                            {data.reviews}
                        </p>
                    </div>
                </div>}


                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Thêm quản lý
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Địa chỉ email"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={staffEmail}
                            onChange={(e) => setStaffEmail(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Họ và tên"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={staffName}
                            onChange={(e) => setStaffName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button onClick={handleSave}>Thêm</Button>
                    </DialogActions>
                </Dialog>
            </div>
            )
            }
