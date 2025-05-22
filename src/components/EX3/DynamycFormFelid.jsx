import { Input, Button } from "antd";
import React, { useState } from "react";

const DynamycFormFelid = () => {
  const [inputFields, setInputFields] = useState([
    {
      id: 1,
      nameSchool: "",
      degree: "",
      yearOfGraduation: "",
      errors: {
        nameSchool: "",
        degree: "",
        yearOfGraduation: "",
      },
    },
  ]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newInputFields = [...inputFields];

    // Update value
    newInputFields[index][name] = value;

    // Delete user write
    newInputFields[index].errors[name] = "";

    setInputFields(newInputFields);
  };

  const validateForm = () => {
    const newInputFields = [...inputFields];
    let isVaild = true;

    newInputFields.forEach((field) => {
      field.errors = {
        nameSchool: "",
        degree: "",
        yearOfGraduation: "",
      };

      if (!field.nameSchool) {
        field.errors.nameSchool = "Vui lòng nhập trường";
        isVaild = false;
      }

      if (!field.degree) {
        field.errors.degree = "Vui lòng nhập bằng cấp";
        isVaild = false;
      }

      if (!field.yearOfGraduation) {
        field.errors.yearOfGraduation = "Vui lòng chọn năm tốt nghiệp";
        isVaild = false;
      }

      setInputFields(newInputFields);
      return isVaild;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submit");
    }
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        id: inputFields.length + 1,
        nameSchool: "",
        degree: "",
        yearOfGraduation: "",
        errors: {
          nameSchool: "",
          degree: "",
          yearOfGraduation: "",
        },
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  return (
    <div className="container">
      <h2>Dynamyc Form Felid</h2>

      <form onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4" key={index}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-medium">Học Viên #{index + 1}</h3>
              <button
                type="button"
                onClick={() => handleRemoveFields(index)}
                className="w-7 h-7 rounded-full text-xl text-red-500 border border-gray-200 flex items-center justify-center"
              >
                -
              </button>
            </div>

            <div className="!space-y-3">
              <Input
                type="text"
                name="nameSchool"
                className="!w-full !px-3 !py-2 !border !border-gray-200 !rounded-md !focus:outline-none !focus:ring-1 !focus:ring-blue-500"
                placeholder="Tên trường"
                value={inputField?.nameSchool || ""}
                onChange={(e) => handleInputChange(index, e)}
              />
              {inputField?.errors?.nameSchool && (
                <p className="text-red-600">{inputField.errors.nameSchool}</p>
              )}
              <Input
                type="text"
                name="degree"
                className="!w-full !px-3 !py-2 !border !border-gray-200 !rounded-md !focus:outline-none !focus:ring-1 !focus:ring-blue-500"
                placeholder="Bằng cấp"
                value={inputField?.degree || ""}
                onChange={(e) => handleInputChange(index, e)}
              />
              {inputField?.errors?.degree && (
                <p className="text-red-600">{inputField.errors.degree}</p>
              )}
              <Input
                type="number"
                name="yearOfGraduation"
                className="!w-full !px-3 !py-2 !border !border-gray-200 !rounded-md !focus:outline-none !focus:ring-1 !focus:ring-blue-500"
                placeholder="Năm tốt nghiệp"
                value={inputField?.yearOfGraduation || ""}
                onChange={(e) => handleInputChange(index, e)}
              />
              {inputField?.errors?.yearOfGraduation && (
                <p className="text-red-600">
                  {inputField.errors.yearOfGraduation}
                </p>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          className="border-1 w-xl rounded-lg border-dashed"
          onClick={handleAddFields}
        >
          + Thêm học vấn
        </button>
        <div className="flex justify-start">
          <Button className="mt-4 " type="primary" htmlType="submit">
            Lưu
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DynamycFormFelid;
