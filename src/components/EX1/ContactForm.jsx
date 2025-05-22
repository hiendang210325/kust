import React, { useState } from "react";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const ContactForm = () => {
  const [formInputData, setFormInputData] = useState({
    fullName: "",
    email: "",
    description: "",
  });
  const [dataError, setDataError] = useState({
    fullName: "",
    email: "",
    description: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newError = { fullName: "", email: "", description: "" };
    let hasErrors = false;

    if (!formInputData.fullName) {
      newError.fullName = "Please enter your Full Name";
      hasErrors = true;
    }

    if (!formInputData.email) {
      newError.email = "Please enter your Email";
      hasErrors = true;
    }

    if (!formInputData.description) {
      newError.description = "Please enter your description";
      hasErrors = true;
    }

    setDataError(newError);

    if (!hasErrors) {
      console.log("Submit", formInputData);
    }
  };

  // Create class input in errors
  const getInputClassName = (redName) => {
    const baseClasses = "!rounded-md !p-2 !mt-1 !w-full";

    return dataError[redName] // use Ternary Operator
      ? `${baseClasses} !border-2 !border-red-500`
      : `${baseClasses} !border-2 !border-gray-400`;
  };

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setFormInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setDataError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <div>
      <div className="w-80 rounded-xl shadow-xl p-4 bg-white">
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-center font-bold mb-4">
            Building a Simple Contact Form
          </h2>

          <div className="mb-4">
            <label className="font-bold text-base block">
              Họ Tên
              <Input
                name="fullName"
                type="text"
                value={formInputData.fullName}
                onChange={handleInputData}
                className={getInputClassName("fullName")}
                placeholder="Nhập họ và tên của bạn"
              />
              {dataError.fullName && (
                <p className="text-red-700">{dataError.fullName}</p>
              )}
            </label>
          </div>

          <div className="mb-4">
            <label className="font-bold text-base block">
              Email
              <Input
                name="email"
                type="email"
                value={formInputData.email}
                onChange={handleInputData}
                className={getInputClassName("email")}
                placeholder="Nhập email của bạn"
              />
              {dataError.email && (
                <p className="text-red-700">{dataError.email}</p>
              )}
            </label>
          </div>

          <div className="mb-4">
            <label className="font-bold text-base block">
              Message
              <TextArea
                name="description"
                type="text"
                value={formInputData.description}
                onChange={handleInputData}
                className={getInputClassName("description")}
                placeholder="Nhập tin nhắn của bạn"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              {dataError.description && (
                <p className="text-red-700">{dataError.description}</p>
              )}
            </label>
          </div>

          <Button
            type="primary" // Antd button type
            htmlType="submit" // HTML form submit type
            className="!w-full !text-center"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
