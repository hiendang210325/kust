import React, { useState } from "react";
import { Button, Input, Select, DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";

const FormValidation = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
    birthDate: "",
    gender: "",
    address: "",
  });

  const [formDataError, setFormDataError] = useState({
    fullName: "Vui lòng nhập họ tên!",
    email: "Vui lòng nhập email!",
    number: "Vui lòng nhập số điện thoại!",
    birthDate: "Vui lòng chọn ngày sinh!",
    gender: "Vui lòng chọn giới tính!",
    address: "Vui lòng nhập địa chỉ!",
  });

  const handleFormValidationData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value) {
      setFormDataError((prev) => ({
        ...prev,
        [name]: "",
      }));
    } else {
      setFormDataError((prev) => ({
        ...prev,
        [name]: `Vui lòng nhập ${getFieldName(name)}!`,
      }));
    }
  };

  const getFieldName = (name) => {
    const fielNames = {
      fullName: "họ tên",
      email: "email",
      number: "số điện thoại",
      birthDate: "ngày sinh",
      gender: "giới tính",
      address: "địa chỉ",
    };
    return fielNames[name] || name;
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prev) => ({
      ...prev,
      birthDate: dateString,
    }));

    if (dateString) {
      setFormDataError((prev) => ({
        ...prev,
        birthDate: "",
      }));
    } else {
      setFormDataError((prev) => ({
        ...prev,
        birthDate: "Vui lòng nhập ngày sinh",
      }));
    }
  };

  const handleGenderChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));

    if (value) {
      setFormDataError((prev) => ({
        ...prev,
        gender: "",
      }));
    } else {
      setFormDataError((prev) => ({
        ...prev,
        gender: "Vui lòng nhập giới tính",
      }));
    }
  };

  const handleFormValidation = (e) => {
    e.preventDefault();
    const newErrors = {
      fullName: "",
      email: "",
      number: "",
      birthDate: "",
      gender: "",
      address: "",
    };

    let hasErrors = false;

    if (!formData.fullName) {
      newErrors.fullName = "Vui lòng nhập họ tên!";
      hasErrors = true;
    }

    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email!";
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ!";
      hasErrors = true;
    }

    if (!formData.number) {
      newErrors.number = "Vui lòng nhập số điện thoại!";
      hasErrors = true;
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Vui lòng chọn ngày sinh!";
      hasErrors = true;
    }

    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính!";
      hasErrors = true;
    }

    if (!formData.address) {
      newErrors.address = "Vui lòng nhập địa chỉ!";
      hasErrors = true;
    }

    setFormDataError(newErrors);

    if (!hasErrors) {
      console.log("submit", formData);
    }
  };

  const getClassName = (fieldName) => {
    // Fixed the logic - it was reversed in the original
    const classBase = "!rounded-md !p-2 !mt-1 !w-full";

    return formDataError[fieldName]
      ? `${classBase} !border-2 !rounded-xl !border-red-500`
      : `${classBase} !border-2 !border-gray-400`;
  };

  return (
    <div>
      <div className="w-xl rounded-xl shadow-xl p-8 bg-white">
        <form onSubmit={handleFormValidation}>
          <div className="mb-4">
            <label className="font-bold text-base block">
              <span className="text-red-700">*</span> Họ và tên
              <Input
                name="fullName"
                type="text"
                allowClear
                className={getClassName("fullName")}
                value={formData.fullName}
                onChange={handleFormValidationData}
                placeholder="Nhập họ và tên"
              />
              {formDataError.fullName && (
                <p className="text-red-400 text-xs">{formDataError.fullName}</p>
              )}
            </label>
          </div>

          <div className="mb-4">
            <label className="font-bold text-base block">
              <span className="text-red-700">*</span> Email
              <Input
                name="email"
                type="email"
                allowClear
                className={getClassName("email")}
                value={formData.email}
                onChange={handleFormValidationData}
                placeholder="Nhập email"
              />
              {formDataError.email && (
                <p className="text-red-400 text-xs">{formDataError.email}</p>
              )}
            </label>
          </div>

          <div className="mb-4">
            <label className="font-bold text-base block">
              <span className="text-red-700">*</span> Số điện thoại
              <Input
                name="number"
                type="number"
                allowClear
                className={getClassName("number")}
                value={formData.number}
                onChange={handleFormValidationData}
                placeholder="Nhập số điện thoại"
              />
              {formDataError.number && (
                <p className="text-red-400 text-xs">{formDataError.number}</p>
              )}
            </label>
          </div>

          <div className="mb-4">
            <label className="font-bold text-base block">
              <span className="text-red-700">*</span> Ngày sinh
              <DatePicker
                onChange={handleDateChange}
                className={
                  formDataError.birthDate
                    ? "w-full !border-2 !border-red-500"
                    : "w-full"
                }
                placeholder="Chọn ngày sinh"
              />
              {formDataError.birthDate && (
                <p className="text-red-400 text-xs">
                  {formDataError.birthDate}
                </p>
              )}
            </label>
          </div>

          <div className="mb-4">
            <label className="font-bold text-base block">
              <span className="text-red-700">*</span> Giới tính
              <Select
                className={
                  formDataError.gender
                    ? "w-full !rounded-xl !border-3 !border-red-700"
                    : "w-full"
                }
                placeholder="Chọn giới tính"
                style={{ width: "100%" }}
                allowClear
                options={[
                  { value: "Nam", label: "Nam" },
                  { value: "Nữ", label: "Nữ" },
                ]}
                onChange={handleGenderChange}
              />
              {formDataError.gender && (
                <p className="text-red-400 text-xs">{formDataError.gender}</p>
              )}
            </label>
          </div>

          <div className="mb-4">
            <label className="font-bold text-base block">
              <span className="text-red-700">*</span> Địa chỉ
              <TextArea
                name="address"
                type="text"
                allowClear
                className={getClassName("address")}
                value={formData.address}
                onChange={handleFormValidationData}
                placeholder="Nhập địa chỉ"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              {formDataError.address && (
                <p className="text-red-400 text-xs">{formDataError.address}</p>
              )}
            </label>
          </div>

          <Button type="primary" htmlType="submit" className="bg-blue-500">
            Đăng ký
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormValidation;
