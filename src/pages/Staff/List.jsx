import {Table, Tag} from "antd";
import {FormattedDate} from "react-intl";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import STAFF from "../../services/staffService";
import {toast} from "react-toastify";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {staffRole} from "../../utils/constant";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";


export default function StaffList() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState(staffRole.DOCTOR);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = async (id) => {
        try {
            const res = await STAFF.activeStaff(id);
            console.log(res);
            if (res.status === 200) {
                toast.success("Cập nhật trạng thái thành công");
                data.map((item) => {
                    if (item.id === id) {
                        item.active = !item.active;
                    }
                });
                setData([...data]);
            } else {
                toast.error("Cập nhật trạng thái thất baị");
            }
        } catch (e) {
            console.log(e);
            toast.error("Cập nhật thái thất bại");
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Trang thái',
            dataIndex: 'active',
            key: 'active',
            width: 150,
            filters: [
                {
                    text: 'Hoạt động',
                    value: true,
                },
                {
                    text: 'Ngừng hoạt động',
                    value: false,
                }
            ],
            onFilter: (value, record) => record.status === value,
            render: (_, {active}) => <>{active ? <Tag color="green">Hoạt động</Tag> :
                <Tag color="red">Ngừng hoạt động</Tag>}</>,
        },
        {
            title: 'Cập nhật lần cuối',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: 250,
            sorter: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
            render: (text) => <FormattedDate value={text}
                                             year="numeric"
                                             month="long"
                                             day="numeric"
                                             hour="numeric"
                                             minute="numeric"/>
        },
        {
            title: 'Hành động',
            dataIndex: 'active',
            key: 'active',
            render: (_, {active, id}) => {
                if (active) {
                    return (
                        <Button
                            variant="contained"
                            onClick={() => handleEdit(id)}
                        >
                            Ngừng
                        </Button>
                    )
                } else {
                    return (
                        <Button
                            variant="contained"
                            onClick={() => handleEdit(id)}
                        >
                            Kích hoạt
                        </Button>
                    )
                }
            }
        }
    ];


    const fetchData = async () => {
        try {
            const res = await STAFF.getAllStaff();
            setData(res.data);
            setFilteredData(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (search !== '') {
            setFilteredData(data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())));
        } else {
            setFilteredData(data);
        }
    }, [search]);


    return (
        <>
            <div className="h-[75vh]">
                <div className="w-full flex h-10 my-auto justify-start gap-3">
                    <div className="w-28 text-center my-auto font-bold">Họ và tên</div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        className={`w-1/3 h-full border border-gray-300 hover:border-gray-500 rounded-lg p-2`}
                    />
                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                    >Thêm nhân sự</Button>
                </div>
                <Table columns={columns} dataSource={filteredData} pagination={{pageSize: 6}}/>
            </div>
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
                        Thêm nhân sự
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FormControl
                        variant="standard"
                    >
                    <InputLabel htmlFor="demo-simple-select-label">Vai trò</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            variant="standard"
                            sx={{marginTop: 1}}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value={staffRole.DOCTOR}>Bác sĩ</MenuItem>
                            <MenuItem value={staffRole.MANAGER}>Quản lý</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button type="submit">Thêm</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}