export const bookingStatus = [
  {
    id: 0,
    name: 'Chờ xác nhận',
    color: 'yellow',
  },
  {
    id: 1,
    name: 'Xác nhận',
    color: 'green',
  },
  {
    id: 2,
    name: 'Từ chối',
    color: 'red',
  },
  {
    id: 3,
    name: 'Đã khám',
    color: 'blue',
  },
  {
    id: 4,
    name: 'Đã huỷ',
    color: 'gray',
  },
  {
    id: 5,
    name: 'Đang khám',
    color: 'cyan',
  },{
    id: 6,
    name: 'Chờ khám',
    color: 'purple',
  }
]

export const staffRole = {
  DOCTOR: 0,
  MANAGER: 1,
  ADMIN: 2
};

export const guideStatus = [
  {
    id: false,
    name: 'Ẩn',
    color: 'yellow',
  },
  {
    id: true,
    name: 'Hiện',
    color: 'green',
  }
]

export const facilityType = [
  {
    id: 0,
    name: 'Bệnh viện',
    color: 'blue',
  },
  {
    id: 1,
    name: 'Khòng khám',
    color: 'green',
  },
  {
    id: 2,
    name: 'Trạm y tế',
    color: 'purple',
  }
]

export const specialitiesL = [
  {
    id: 0,
    name: "Đa khoa - Tổng hợp",
    key: "General",
  },
  {
    id: 1,
    name: "Tiêu hóa",
    key: "Gastroenterology",
  },
  {
    id: 2,
    name: "Tim mạch",
    key: "Cardiology",
  },
  {
    id: 3,
    name: "Chỉnh hình",
    key: "Orthopedics",
  },
  {
    id: 4,
    name: "Tai-mũi-họng",
    key: "ENT",
  },
  {
    id: 5,
    name: "Thần kinh",
    key: "Neurology",
  },
  {
    id: 6,
    name: "Da liễu",
    key: "Dermatology",
  },
  {
    id: 7,
    name: "Nam học",
    key: "Andrology",
  },
  {
    id: 8,
    name: "Tiết niệu",
    key: "Urology",
  },
  {
    id: 9,
    name: "Sản Phụ khoa",
    key: "Gynecology",
  },
  {
    id: 10,
    name: "Hô hấp",
    key: "Pulmonology",
  },
  {
    id: 11,
    name: "Răng-hàm-mặt",
    key: "Dentomaxillofacial",
  },
  {
    id: 12,
    name: "Xương khớp",
    key: "Rheumatology",
  },
  {
    id: 13,
    name: "Khoa nhi",
    key: "Pediatrics",
  },
  {
    id: 14,
    name: "Khoa ngoại",
    key: "Oncology",
  },
  {
    id: 15,
    name: "Nhãn khoa",
    key: "Opthalmology",
  },
  {
    id: 16,
    name: "Thú y",
    key: "Veterinary",
  }
]

export const serviceType = {
  DOCTOR: 0,
  PACKAGE: 1,
  REMOTE: 2,
};
