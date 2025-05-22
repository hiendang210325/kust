import axios from "axios";
import React, { useState } from "react";

const ApiForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.userName || formData.userName.length < 4) {
      formErrors.userName = "Tên đăng nhập phải có ít nhất 4 ký tự!";
      isValid = false;
    }

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailCheck.test(formData.email)) {
      formErrors.email = "Email không hợp lệ!";
      isValid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      formErrors.password = "Mật khẩu phải có ít nhất 6 kí tự!";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setApiError("");
    setIsSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.example.com/register",
        formData
      );

      setIsSuccess(true);
      setFormData({ userName: "" });
      alert("Đăng ký thành công", response.data);
    } catch (error) {
      console.error("Lỗi khi đăng ký", error);

      if (error.response) {
        const serverErrors = error.response.data.errors;
        if (serverErrors) {
          setErrors(serverErrors);
        } else {
          setApiError(
            error.response.data.message ||
              "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!"
          );
        }
      } else if (error.request) {
        setApiError("Không thể kết nối đến server. Vui lòng thử lại!");
      } else {
        setApiError("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          API Form Submission
        </h2>

        {apiError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded relative">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              <p className="text-red-700 flex-1">Lỗi: {apiError}</p>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => setApiError("")}
              >
                X
              </button>
            </div>
          </div>
        )}

        {isSuccess && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded relative">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <p className="text-green-700 flex-1">Đăng ký thành công</p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-green-500 hover:text-green-700"
              >
                X
              </button>
            </div>
          </div>
        )}

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-gray-700 font-medium mb-2"
              >
                * Tên đăng nhập
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Nhập tên đăng nhập"
                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
                  errors.userName
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập địa chỉ email"
                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded font-medium text-white ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApiForm;
