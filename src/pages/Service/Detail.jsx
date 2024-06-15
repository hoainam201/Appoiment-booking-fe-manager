import React, {useEffect, useState} from "react"
import Editor from "../../components/Editor/Editor"
import Viewer from "../../components/Editor/Viewer"
import "../../components/Editor/style.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Slide from '@mui/material/Slide';
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import STAFF from "../../services/staffService";
import {serviceType, specialitiesL, staffRole} from "../../utils/constant";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import ReviewCard from "../../components/ReviewCard";
import {FormattedDate} from "react-intl";
import {Empty, Pagination} from 'antd';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import TextArea from "antd/es/input/TextArea";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import EditNoteIcon from "@mui/icons-material/EditNote";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import Rating from "@mui/material/Rating";

const initialMarkdownContent = "**Empty**..."

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Detail() {
    const [editorHtmlValue, setEditorHtmlValue] = useState("");
    const [data, setData] = useState({});
    const [description, setDescription] = useState(initialMarkdownContent);
    const [editorMarkdownValue, setEditorMarkdownValue] = useState("");
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [fee, setFee] = useState("");
    const [file, setFile] = useState("");
    const [type, setType] = useState(serviceType.DOCTOR);
    const [speciality, setSpeciality] = useState(specialitiesL[0].id);
    const [chargeOf, setChargeOf] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [image, setImage] = useState("");
    const id = useParams();
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [content, setContent] = useState("");

    const [openDialog, setOpenDialog] = useState(false);
    const [update, setUpdate] = useState(false);
    const [idReview, setIdReview] = useState("");

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const res = await STAFF.getServiceById(id.id);
                if (res.status === 200) {
                    setData(res.data);
                    setName(res.data.name);
                    setFee(res.data.fee);
                    setFile(res.data.file);
                    setType(res.data.type);
                    setImage(res.data.image);
                    setDescription(res.data.description);
                    setSpeciality(res.data.speciality);
                    setChargeOf(res.data.charge_of);
                    setEditorMarkdownValue(res.data.description);
                }
            } catch (e) {
                setData({});
            }
        }
        fetchServiceData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await STAFF.getReviewsByServiceId(id.id, page);
            if (res.status === 200) {
                console.log(res.data);
                setReviews(res.data.reviews);
                setTotal(res.data.total);
            } else {
                setReviews([]);
                setTotal(0);
            }
        }
        fetchData();
    }, [page]);

    const navigate = useNavigate();

    const handleClickOpen = (id) => {
        setOpen(true);
        setIdReview(id);
    };

    const handleClose = () => {
        setOpen(false);
        setIdReview("");
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const onEditorContentChanged = content => {
        setEditorHtmlValue(content.html)
        setEditorMarkdownValue(content.markdown)
    }

    const handleSave = () => {
        setDescription(editorMarkdownValue);
        setOpenDialog(false);
    }

    const clickUpdate = () => {
        setUpdate(true);
    }

    const handleCancel = () => {
        setImage(data.image);
        setName(data.name);
        setFee(data.fee);
        setType(data.type);
        setSpeciality(data.speciality);
        setChargeOf(data.charge_of);
        setDescription(data.description);
        setUpdate(false);
    }

    const handleSubmit = async () => {
        if (name === "" || description === "" || fee === "") {
            toast.error("Vui điền đầy đủ thông tin");
        } else {
            try {
                const res = await STAFF.updateService({
                    id: data.id,
                    name,
                    description,
                    fee,
                    file,
                    type,
                    speciality,
                    chargeOf
                });
                if (res.status === 200) {
                    toast.success("Cập nhật thành công");
                    setUpdate(false);
                } else {
                    toast.error("Cập nhật thất bại, vui lòng thử lại sau");
                }
            } catch (e) {
                toast.error("Cập nhật thất bại, vui lòng thử lại sau");
            }
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await STAFF.getDoctorList();
                if (res.status === 200) {
                    setDoctors(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex flex-col max-h-[75vh] overflow-y-auto">
            <div className="flex justify-between">
                {
                    update ? <Button
                            sx={{
                                ml: 1,
                                textTransform: "none",
                            }}
                            onClick={handleCancel}
                            variant="text"
                            startIcon={<CancelIcon/>}
                        >Hủy</Button> :
                        <Button
                            sx={{
                                mr: 1,
                                textTransform: "none",
                            }}
                            onClick={() => navigate(-1)}
                            variant="text"
                            startIcon={<ArrowBackIosIcon/>}
                        >Quay lại</Button>
                }
                <h1 className={`text-3xl font-bold text-center`}>Chi tiết dịch vụ</h1>
                <Button
                    sx={{
                        ml: 1,
                        textTransform: "none",
                    }}
                    onClick={update ? handleSubmit : clickUpdate}
                    variant={update ? "contained" : "outlined"}
                    startIcon={update ? <SaveIcon/> : <EditIcon/>}
                >{update ? "Lưu" : "Cập nhật"}</Button>
            </div>
            <div className={`flex flex-col items-start`}>
                <p className={`text-xl font-bold`}>Ảnh</p>
                <div className="relative w-full">
                    <input
                        type="file"
                        hidden
                        disabled={!update}
                        className={`absolute w-full opacity-0 h-32 flex  outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                        onChange={e => setFile(e.target.files[0])}
                    />
                    {
                        file ? <img src={URL.createObjectURL(file)}
                                    className={`h-32 w-auto object-cover rounded-lg outline-1`}/> :
                            image ? <img
                                    src={image}
                                    alt="avatar"
                                    className="h-32 w-auto object-cover rounded-lg outline-1"
                                /> :
                                <div
                                    className={`h-32 w-full flex justify-center items-center rounded-lg outline-1 border-2 border-gray-200 p-2 hover:cursor-pointer hover:scale-105`}
                                >
                                    <p>Click hoặc kéo thả ảnh vào đây</p>
                                </div>

                    }
                </div>
            </div>
            <div className={`flex flex-col items-start`}>
                <p className={`text-xl font-bold`}>Tên dịch vụ</p>
                <input
                    disabled={!update}
                    className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                    type="text"
                    placeholder="Tên dịch vụ"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className={`flex flex-col items-start`}>
                <p className={`text-xl font-bold`}>Chi phí dịch vụ</p>
                <input
                    className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                    type="text"
                    placeholder="(VND)"
                    disabled={!update}
                    value={fee}
                    onChange={e => setFee(e.target.value)}
                />
            </div>
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
                        disabled={!update}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value={serviceType.DOCTOR}>Bác sĩ</MenuItem>
                        <MenuItem value={serviceType.PACKAGE}>Gói khám</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={`flex flex-col items-start`}>
                <FormControl
                    variant="standard"
                >
                    <InputLabel htmlFor="demo-simple-select-label2">Chuyên khoa</InputLabel>
                    <Select
                        disabled={!update}
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
            <div className={`flex flex-col items-start`}>
                <FormControl
                    variant="standard"
                >
                    <InputLabel htmlFor="demo-simple-select-label3">Bác sĩ</InputLabel>
                    <Select
                        disabled={!update}
                        labelId="demo-simple-select-label3"
                        id="demo-simple-select"
                        variant="standard"
                        sx={{
                            marginTop: 5,
                            maxHeight: 300,
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
                        value={chargeOf}
                        onChange={(e) => setChargeOf(e.target.value)}
                    >
                        {doctors.length > 0 && doctors.map((item, index) => (
                            <MenuItem key={index} value={item.email}>{item.name}</MenuItem>
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
                        disabled={!update}
                        color="primary"
                        onClick={handleOpenDialog}>
                        Edit
                    </Button>
                </div>
            </div>
            <div className="viewer max-h-[300px] rounded-lg">
                <Viewer value={description}/>
            </div>
            {data && <div className={`flex items-center h-12 w-full justify-between`}>
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
                    Số luợt đăng ký
                </p>
                <div className={`flex ml-2 mt-1 justify-end`}>
                    <p>
                        {data.booking_count}
                    </p>
                </div>
            </div>}

            {data && <div className={`flex items-center h-12 w-full justify-between`}>
                <p className={`text-xl font-bold text-center`}>
                    Số lượt khám
                </p>
                <div className={`flex ml-2 mt-1 justify-end`}>
                    <p>
                        {data.completed_booking_count}
                    </p>
                </div>
            </div>}
            {data && <div className={`flex items-center h-12 w-full justify-between`}>
                <p className={`text-xl font-bold text-center`}>
                    Ngày tạo
                </p>
                <div className={`flex ml-2 mt-1 justify-end`}>
                    <FormattedDate value={data.created_at}
                                   year="numeric"
                                   month="long"
                                   day="numeric"
                                   hour="numeric"
                                   minute="numeric"
                    />
                </div>
            </div>}
            {data && <div className={`flex items-center h-12 w-full justify-between`}>
                <p className={`text-xl font-bold text-center`}>
                    Ngày cập nhật
                </p>
                <div className={`flex ml-2 mt-1 justify-end`}>
                    <FormattedDate value={data.updated_at}
                                   year="numeric"
                                   month="long"
                                   day="numeric"
                                   hour="numeric"
                                   minute="numeric"
                    />
                </div>
            </div>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
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
                <DialogTitle>Phản hồi</DialogTitle>
                <DialogContent>
                    <TextArea
                        name="Nội dung"
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button type="submit">Gửi</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullScreen
                open={openDialog}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseDialog}
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


            {/*    Reivew list*/}
            <div className={`flex items-center h-12 w-full justify-between`}>
                <p className={`text-xl font-bold text-center`}>
                    Danh sách đánh giá
                </p>
            </div>
            <div className="viewer h-auto rounded-lg">
                {reviews.length > 0 ? reviews.map((item, index) => (
                        <div className="outline outline-1 outline-gray-200 rounded-md my-2">
                            <div className="flex flex-col ml-3">
                                <div className="flex gap-3 my-1">
                                    <div className="font-bold">{item?.name}</div>
                                    <Rating name="read-only" value={4} readOnly/>
                                    <div className="text-sm">
                                        <FormattedDate value={item?.created_at}
                                                       year="numeric"
                                                       month="long"
                                                       day="numeric"
                                                       hour="numeric"
                                                       minute="numeric"
                                        />
                                    </div>
                                </div>
                                <div>{item?.comment}</div>
                                <hr/>
                                <div className="flex my-1">
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            handleClickOpen(item?.id);
                                        }}
                                    >
                                        Phản hồi
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )) :
                  <div>
                    <Empty/>
                  </div>
                }
                {total > 0 && <div className="w-full h-10 flex justify-center items-center">
                    <Pagination total={total} variant="outlined" onChange={(e) => {
                        setPage(e.target.textContent);
                    }}/>
                </div>}
            </div>
        </div>
    )
}
