import React from "react";
import { Tabs } from "antd";
import ContractForm from "./EX1/ContactForm";
import FormValodation from "./EX2/FormValidation";
import DynamycFormFelid from "./EX3/DynamycFormFelid";
import ApiForm from "./EX4/ApiForm";
import AdvancedValidations from "./EX5/AdvancedValidations";

const Header = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Simple Contact",
      children: <ContractForm />,
    },
    {
      key: "2",
      label: "Form Validation",
      children: <FormValodation />,
    },
    {
      key: "3",
      label: "Dynamic Fields",
      children: <DynamycFormFelid />,
    },
    {
      key: "4",
      label: "API Submission",
      children: <ApiForm />,
    },
    {
      key: "5",
      label: "Advanced Validation",
      children: <AdvancedValidations />,
    },
  ];

  return <Tabs items={items} onChange={onChange} />;
};

export default Header;
