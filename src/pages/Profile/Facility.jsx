import avt from "../../assets/images/avt.png";
import {FormattedDate} from "react-intl";
import {Button} from "@mui/material";
import React, {useState} from "react";
import Viewer from "../../components/Editor/Viewer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Editor from "../../components/Editor/Editor";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import EditNoteIcon from "@mui/icons-material/EditNote";

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
    const [editorMarkdownValue, setEditorMarkdownValue] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = async () => {

    }

    const hanleCancel = () => {

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
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Địa chỉ
                            </dt>
                            <dd className="mt-1 h-8 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input className="h-full focus:outline-gray-300 hover:outline-gray-300 w-full"
                                       value={address} onChange={(e) => setAddress(e.target.value)}/>
                            </dd>
                        </div>
                    </dl>
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