import avt from "../../assets/images/avt.png";
import {FormattedDate} from "react-intl";
import {Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import Viewer from "../../components/Editor/Viewer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Editor from "../../components/Editor/Editor";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import LeafletMap from "../../components/Map/LeafletMap";
import STAFF from "../../services/staffService";
import axios from "axios";
import {useMapEvents} from "react-leaflet";
import {toast} from "react-toastify";
import {facilityType, specialitiesL} from "../../utils/constant";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Facility = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [avtUrl, setAvtUrl] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
    const [specialities, setSpecialities] = useState("");
    const [type, setType] = useState("");
    const [lat, setLat] = useState(20.9757581);
    const [lng, setLng] = useState(105.8626556);
    const [editorMarkdownValue, setEditorMarkdownValue] = useState("");
    const [open, setOpen] = useState(false);

    const fetchLocation = async () => {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        if (res.status === 200 && res.data.length > 0) {
            console.log(res.data[0]);
            setLat(res.data[0].lat);
            setLng(res.data[0].lon);
        }
    }

    const fetchData = async () => {
        const res = await STAFF.getFacilityByToken();
        if (res.status === 200) {
            console.log(res.data);
            setData(res.data);
            setEmail(res.data.email);
            setName(res.data.name);
            setAvtUrl(res.data.avatar);
            setSpecialities(res.data.specialities);
            setType(res.data.type);
            setAddress(res.data.address);
            setPhone(res.data.phone);
            setLat(res.data.latitude);
            setLng(res.data.longitude);
            setDescription(res.data.description);
            setEditorMarkdownValue(res.data.description);
        } else {
            toast.error(res.data.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {
        if (!email || !name || !address || !phone || !description) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }
        console.log({email, name, address, phone, description, specialities, type, file, lat, lng});
        const res = await STAFF.updateFacility({
            email,
            name,
            address,
            phone,
            description,
            specialities,
            type,
            file,
            lat,
            lng
        });
        if (res.status === 200) {
            toast.success("Cập nhật profile thành công");
        } else {
            toast.error(res.data.message);
        }
    }

    const hanleCancel = () => {
        setEmail(data.email);
        setName(data.name);
        setAvtUrl(data.avatar);
        setAddress(data.address);
        setPhone(data.phone);
        setSpecialities(data.specialities);
        setType(data.type);
        setLat(data.latitude);
        setLng(data.longitude);
        setDescription(data.description);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onEditorContentChanged = content => {
        setEditorMarkdownValue(content.markdown)
    }

    const handleSave = (content) => {
        setDescription(editorMarkdownValue);
        setOpen(false);
    }

    return (
        <div className="max-h-[75vh] overflow-auto">
            <div className="bg-white overflow-hidden shadow rounded-lg border w-2/3 m-auto">
                <div className="flex items-center justify-between">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Hồ sơ
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Thông tin cơ sở y tế
                        </p>
                    </div>
                    <div className="px-4 py-5 sm:px-6 relative">
                        {file ? (
                            <img className="h-20 w-20 rounded-full"
                                 src={URL.createObjectURL(file)} alt=""/>
                        ) : (
                            <img className="h-20 w-20 rounded-full object-center"
                                 src={avtUrl ? avtUrl : avt} alt=""/>
                        )}
                        <input
                            type="file"
                            className="absolute bg-white rounded-full top-5 left-6 w-20 h-20 opacity-0 hover:scale-105 hover:cursor-pointer"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Tên cơ sở
                            </dt>
                            <dd className="mt-1 h-8 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input className="h-full focus:outline-gray-300 hover:outline-gray-300 w-full"
                                       value={name} onChange={(e) => setName(e.target.value)}/>
                            </dd>
                        </div>
                    </dl>
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="relative py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Địa chỉ
                            </dt>
                            <dd className="mt-1 h-8 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input className="h-full focus:outline-gray-300 hover:outline-gray-300 w-full"
                                       value={address} onChange={(e) => setAddress(e.target.value)}/>
                            </dd>
                            <Button sx={{
                                position: 'absolute',
                                right: 18,
                                top: 18
                            }}
                                    onClick={fetchLocation}>Lấy vị trí</Button>
                        </div>
                    </dl>
                    <div
                        className="flex items-center justify-center h-[300px] w-full "
                    >
                        <LeafletMap lat={lat} lng={lng}/>
                    </div>
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Số điện thoại
                            </dt>
                            <dd className="mt-1 h-8 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input className="h-full focus:outline-gray-300 hover:outline-gray-300 w-full"
                                       value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            </dd>
                        </div>
                    </dl>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Chuyên Khoa
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <select value={specialities} onChange={(e) => setSpecialities(e.target.value)}>
                                {specialitiesL.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Loại cơ sở
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                {facilityType.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </dd>
                    </div>
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email
                            </dt>
                            <dd className="mt-1 h-8 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input className="h-full outline-gray-300 hover:outline-gray-300 w-full"
                                       value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </dd>
                        </div>
                    </dl>
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Mô tả
                            </dt>
                            <dd className="mt-1 h-8 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <div className={`flex ml-2 mt-1 justify-end`}>
                                    <Button
                                        // size="small"
                                        color="primary"
                                        onClick={handleClickOpen}>
                                        Chỉnh sửa
                                    </Button>
                                </div>
                            </dd>
                        </div>
                    </dl>
                    <div
                        className={` items-center max-h-[500px] max-w-full w-auto mx-4 overflow-auto rounded-lg justify-between border-2`}>
                        <Viewer value={description}/>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Cập nhật lần cuối
                        </dt>
                        <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">
                            <FormattedDate value={data.updated_at}
                                           year="numeric"
                                           month="long"
                                           day="numeric"
                                           hour="numeric"
                                           minute="numeric"
                            />
                        </dd>
                    </div>
                </div>
                <div className={`flex ml-5 gap-2 my-2`}>
                    <Button variant="contained" onClick={handleSubmit}>Cập nhật</Button>
                    <Button
                        onClick={hanleCancel}
                    >Hủy</Button>
                </div>
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

export default Facility;