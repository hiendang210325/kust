import React, { useState } from "react";
import {
  Input,
  Button,
  Form,
  DatePicker,
  Alert,
  Progress,
  Space,
  Typography,
} from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const AdvancedValidations = () => {
  const [form] = Form.useForm();
  const [formState, setFormState] = useState({
    password: "",
    confirmPassword: "",
    dob: "",
    creditCard: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    dob: "",
    creditCard: "",
  });

  const [passwordVis, setPasswordVis] = useState({
    password: false,
    confirmPassword: false,
  });

  const validatePass = (password) => {
    if (!password || password.length < 8) {
      return "Mật khẩu phải có ít nhất 8 kí tự";
    }

    if (!/[A-Z]/.test(password)) {
      return "Mật khẩu chứa ít nhất 1 chữ hoa";
    }

    if (!/[a-z]/.test(password)) {
      return "Mật khẩu chứa ít nhất 1 chữ thường";
    }

    if (!/\d/.test(password)) {
      return "Mật khẩu chứa ít nhất 1 chữ số";
    }

    return "";
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== formState.password) {
      return "Mật khẩu xác nhận không khớp!";
    }

    return "";
  };

  const validateDob = (dob) => {
    if (!dob) return "Vui lòng chọn ngày sinh";

    const date = new Date(dob);
    const today = new Date();

    if (isNaN(date.getTime())) {
      return "Ngày sinh không hợp lệ";
    }

    if (date > today) {
      return "Ngày sinh không thể là ngày trong tương lai";
    }

    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 18);
    if (date > minDate) {
      return "Bạn phải đủ 18 tuổi trở lên";
    }

    return "";
  };

  const validateCreditCard = (creditCard) => {
    const cleanedNumber = creditCard.replace(/\D/g, "");

    if (cleanedNumber.length < 13 || cleanedNumber.length > 19) {
      return "Số thẻ tín dụng phải có từ 13 đến 19 chữ số";
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = cleanedNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanedNumber.charAt(i));

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    if (sum % 10 !== 0) {
      return "Số thẻ tín dụng không hợp lệ";
    }

    return "";
  };

  const handleChange = (name, value) => {
    setFormState({ ...formState, [name]: value });

    let errorMessage = "";
    switch (name) {
      case "password":
        errorMessage = validatePass(value);
        if (formState.confirmPassword) {
          setErrors({
            ...errors,
            password: errorMessage,
            confirmPassword:
              value !== formState.confirmPassword
                ? "Mật khẩu xác nhận không khớp!"
                : "",
          });
        } else {
          setErrors({
            ...errors,
            password: errorMessage,
          });
        }
        break;
      case "confirmPassword":
        errorMessage = validateConfirmPassword(value);
        setErrors({
          ...errors,
          confirmPassword: errorMessage,
        });
        break;
      case "dob":
        errorMessage = validateDob(value);
        setErrors({
          ...errors,
          dob: errorMessage,
        });
        break;
      case "creditCard":
        errorMessage = validateCreditCard(value);
        setErrors({
          ...errors,
          creditCard: errorMessage,
        });
        break;
      default:
        break;
    }
  };

  const togglePassword = (field) => {
    setPasswordVis({
      ...passwordVis,
      [field]: !passwordVis[field],
    });
  };

  const handleSubmit = () => {
    const passwordError = validatePass(formState.password);
    const confirmPasswordError = validateConfirmPassword(
      formState.confirmPassword
    );
    const dobError = validateDob(formState.dob);
    const creditCardError = validateCreditCard(formState.creditCard);

    const newErrors = {
      password: passwordError,
      confirmPassword: confirmPasswordError,
      dob: dobError,
      creditCard: creditCardError,
    };

    setErrors(newErrors);

    if (
      !passwordError &&
      !confirmPasswordError &&
      !dobError &&
      !creditCardError
    ) {
      if (
        !formState.password ||
        !formState.confirmPassword ||
        !formState.dob ||
        !formState.creditCard
      ) {
        return;
      }
      alert("Form đã được gửi thành công!");
    }
  };

  const getPasswordStrength = () => {
    const password = formState.password;

    if (!password) return { text: "", percent: 0, status: "" };

    if (password.length < 6) {
      return { text: "Yếu", percent: 25, status: "exception" };
    } else if (password.length < 10) {
      return { text: "Trung bình", percent: 50, status: "normal" };
    } else if (validatePass(password) === "") {
      return { text: "Mạnh", percent: 100, status: "success" };
    } else {
      return { text: "Khá", percent: 75, status: "active" };
    }
  };

  const formatCreditCard = (value) => {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "");
    const groups = [];

    for (let i = 0; i < cleaned.length; i += 4) {
      groups.push(cleaned.substring(i, i + 4));
    }

    return groups.join("-");
  };

  const passwordStrength = getPasswordStrength();

  const disabledDate = (current) => {
    return current && current > new Date();
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "24px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        Building Advanced Forms with Custom Validations
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        {/* password */}
        <Form.Item
          label={
            <>
              Mật khẩu <span style={{ color: "#ff4d4f" }}>*</span>
            </>
          }
          validateStatus={errors.password ? "error" : ""}
          help={errors.password}
          required
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Input.Password
              placeholder="Nhập mật khẩu"
              value={formState.password}
              onChange={(e) => handleChange("password", e.target.value)}
              visibilityToggle={{
                visible: passwordVis.password,
                onVisibleChange: () => togglePassword("password"),
              }}
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />

            {formState.password && (
              <>
                <Text>
                  Độ mạnh:{" "}
                  <Text type={passwordStrength.status}>
                    {passwordStrength.text}
                  </Text>
                </Text>
                <Progress
                  percent={passwordStrength.percent}
                  status={passwordStrength.status}
                  showInfo={false}
                  size="small"
                />
              </>
            )}

            <Text type="secondary" style={{ fontSize: "12px" }}>
              Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số
              và ký tự đặc biệt
            </Text>
          </Space>
        </Form.Item>

        {/* confirmPassword */}
        <Form.Item
          label={
            <>
              Xác nhận mật khẩu <span style={{ color: "#ff4d4f" }}>*</span>
            </>
          }
          validateStatus={errors.confirmPassword ? "error" : ""}
          help={errors.confirmPassword}
          required
        >
          <Input.Password
            placeholder="Xác nhận mật khẩu"
            value={formState.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            visibilityToggle={{
              visible: passwordVis.confirmPassword,
              onVisibleChange: () => togglePassword("confirmPassword"),
            }}
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        {/* Date*/}
        <Form.Item
          label={
            <>
              Ngày sinh <span style={{ color: "#ff4d4f" }}>*</span>
            </>
          }
          validateStatus={errors.dob ? "error" : ""}
          help={errors.dob}
          required
        >
          <DatePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            placeholder="Chọn ngày sinh"
            onChange={(date, dateString) => handleChange("dob", dateString)}
            disabledDate={disabledDate}
          />
        </Form.Item>

        {/* creditCard */}
        <Form.Item
          label={
            <>
              Số thẻ tín dụng <span style={{ color: "#ff4d4f" }}>*</span>
            </>
          }
          validateStatus={errors.creditCard ? "error" : ""}
          help={errors.creditCard}
          required
        >
          <Input
            placeholder="XXXX-XXXX-XXXX-XXXX"
            value={formatCreditCard(formState.creditCard)}
            onChange={(e) => {
              const formattedValue = e.target.value.replace(/[^0-9-]/g, "");
              setFormState({
                ...formState,
                creditCard: formattedValue,
              });
              handleChange("creditCard", formattedValue);
            }}
            maxLength={19}
          />
        </Form.Item>

        {/* button send form */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdvancedValidations;
