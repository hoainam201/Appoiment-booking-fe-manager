import React, {useEffect, useState} from "react"
import Editor from "../../components/Editor/Editor"
import Viewer from "../../components/Editor/Viewer"
import "../../components/Editor/style.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Slide from '@mui/material/Slide';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {serviceType, specialitiesL, staffRole, facilityType} from "../../utils/constant";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import LeafletMap from "../../components/Map/LeafletMap";
import axios from "axios";
import validator from "validator/es";
import STAFF from "../../services/staffService";

const initialMarkdownContent = "**Empty**..."

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Create() {
    const [editorHtmlValue, setEditorHtmlValue] = useState("");
    const [editorMarkdownValue, setEditorMarkdownValue] = useState("");
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [speciality, setSpeciality] = useState(specialitiesL[0].id);
    const [type, setType] = useState(facilityType[0].id);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState(initialMarkdownContent);
    const [file, setFile] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onEditorContentChanged = content => {
        setEditorHtmlValue(content.html)
        setEditorMarkdownValue(content.markdown)
    }

    const handleSave = () => {
        setDescription(editorMarkdownValue);
        setOpen(false);
    }

    const handleCancel = () => {
        navigate("/facility");
        setOpen(false);
    }

    const fetchLocation = async () => {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        if (res.status === 200 && res.data.length > 0) {
            console.log(res.data[0]);
            setLat(res.data[0].lat);
            setLng(res.data[0].lon);
        }
    }

    const handleSubmit = async () => {
        if (name === "" || email === "") {
            toast.error("Vui điền đầy đủ thông tin");
        }
        else if (!validator.isEmail(email)) {
            toast.error("Email hoặc sdt không hợp lệ");
        }
        else {
            try {
                await fetchLocation();
                const res = await STAFF.createFacility({
                    email,
                    name,
                    address,
                    phone,
                    description,
                    specialities: speciality,
                    type: type,
                    avatar: file,
                    lat,
                    lng
                });
                if (res.status === 201) {
                    toast.success("Thêm cs y yế thành công");
                }
                else {
                    toast.error(res.data.message);
                }
            }
            catch (e) {
                toast.error(e.message);
            }
        }
    }

    return (
        <div className="flex flex-col max-h-[75vh] overflow-y-auto">
            <h1 className={`text-3xl font-bold text-center`}>Thông tin cơ sở</h1>
            <div className={`flex flex-col items-start`}>
                <p className={`text-xl font-bold`}>Ảnh</p>
                <div className="relative w-full">
                    <input
                        type="file"
                        hidden
                        className={`absolute w-full opacity-0 h-32 flex  outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                        onChange={e => setFile(e.target.files[0])}
                    />
                    {file ? <img src={URL.createObjectURL(file)}
                                 className={`h-32 w-auto object-cover rounded-lg outline-1`}/> :
                        <div
                            className={`h-32 w-full flex justify-center items-center rounded-lg outline-1 border-2 border-gray-200 p-2 hover:cursor-pointer hover:scale-105`}
                        >
                            <p>Click hoặc kéo thả ảnh vào đây</p>
                        </div>
                    }
                </div>
            </div>
            <div className={`flex flex-col items-start`}>
                <p className={`text-xl font-bold`}>Tên cơ sở</p>
                <input
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
                    className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                    type="text"
                    placeholder="Địa chỉ"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <div className={`absolute bottom-1 right-0`}>
                    <Button
                        variant="text"
                        // startIcon={<EditNoteIcon/>}
                        // size="small"
                        color="primary"
                        onClick={fetchLocation}>
                        Xem vị trí
                    </Button>
                </div>
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


            <div className={`flex items-center h-12 w-full justify-between`}>
                <p className={`text-xl font-bold text-center`}>
                    Mô tả
                </p>
                <div className={`flex ml-2 mt-1 justify-end`}>
                    <Button
                        variant="outlined"
                        startIcon={<EditNoteIcon/>}
                        // size="small"
                        color="primary"
                        onClick={handleClickOpen}>
                        Edit
                    </Button>
                </div>
            </div>
            <div className="viewer max-h-[300px] rounded-lg">
                <Viewer value={description}/>
            </div>
            <div className={`flex items-center h-12 w-full justify-between`}>
                <Button variant="outlined" onClick={handleCancel} color="primary">Hủy</Button>
                <Button variant="contained" onClick={handleSubmit} color="primary">Thêm</Button>
            </div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Chỉnh sửa
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSave}>
                            Lưu
                        </Button>
                    </Toolbar>
                </AppBar>
                <Editor
                    value={editorMarkdownValue}
                    onChange={onEditorContentChanged}
                />
            </Dialog>
        </div>
    )
}
