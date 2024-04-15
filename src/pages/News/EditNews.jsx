import React, { useState } from "react"
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
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import STAFF from "../../services/staffService";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditNews() {
    const [editorHtmlValue, setEditorHtmlValue] = useState("");
    const [content, setContent] = useState("");
    const [editorMarkdownValue, setEditorMarkdownValue] = useState("");
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const id = useParams().id;

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

    const handleSave = (content) => {
        setContent(editorMarkdownValue);
        setOpen(false);
    }

    const handleCancel = () => {
        navigate("/news");
    }

    const handleSubmit = async () => {
        if(title === "" || content === "") {
            toast.error("Vui điền tên bài viết và nội dung bài viết");
        }
        else {
            try {
                const res = await STAFF.updateGuide(id, title, content);
                console.log(res.data);
                if(res.status === 200) {
                    toast.success("Chỉnh sửa bài viết thành công");
                    navigate("/news");
                } else {
                    toast.error("Chỉnh sửa bài viết thất bại, vui lòng thử lại sau");
                }
            }
            catch (e) {
                toast.error("Chỉnh sửa bài viết thất bại, vui lòng thử lại sau");
            }
        }
    }

    const fetchData = async () => {
        try {
            const res = await STAFF.getGuideDetail(id);
            if(res.status === 200) {
                setTitle(res.data.title);
                setContent(res.data.content);
            }
            else {
                toast.error("Không thể tải bài viết");
            }
        }
        catch (e) {
            toast.error("Không thể tải bài viết");
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col max-h-[75vh]">
            <h1 className={`text-3xl font-bold text-center`}>Chỉnh sửa bài viết</h1>
            <div className={`flex flex-col items-start`}>
                <p className={`text-xl font-bold`}>Bài viết</p>
                <input
                    className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                    type="text"
                    placeholder="Tên bài viết"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div className={`flex items-center h-12 w-full justify-between`}>
                <p className={`text-xl font-bold text-center`}>
                    Nội dung
                </p>
                <div className={`flex ml-2 mt-1 justify-end`}>
                    <Button
                        variant="outlined"
                        startIcon={<EditNoteIcon />}
                        // size="small"
                        color="primary"
                        onClick={handleClickOpen}>
                        Chỉnh sửa
                    </Button>
                </div>
            </div>
            <div className="viewer max-h-[500px] overflow-auto rounded-lg">
                <Viewer value={content} />
            </div>
            <div className={`flex items-center h-12 w-full justify-between`}>
                <Button variant="outlined" onClick={handleCancel} color="primary">Hủy</Button>
                <Button variant="contained" onClick={handleSubmit} color="primary">Lưu</Button>
            </div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
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
