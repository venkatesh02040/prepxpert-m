import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom"; // For navigation
import "./StartYourJourney.css";

const API_URL = "https://new-quiz-repo.onrender.com/users"; // JSON Server endpoint

const StartYourJourney = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const navigate = useNavigate(); // For redirection

  const showNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 3,
    });
  };

  useEffect(() => {
    showNotification("info", "Welcome!", "Welcome to PrepXpert 🎉");
  }, []);

  // **Signup Logic**
  const onSignUp = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Check if user already exists
      const response = await fetch(`${API_URL}?email=${values.email}`);
      const existingUsers = await response.json();

      if (existingUsers.length > 0) {
        showNotification("error", "User Exists", "Email is already registered. Please log in.");
      } else {
        const newUser = {
          name: values.name,
          email: values.email,
          password: values.password,
          communication_score: 0,
          aptitude_score: 0,
          technical_score: 0,
          overall_score: 0,
        };

        const addUserResponse = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        if (addUserResponse.ok) {
          showNotification("success", "Sign Up Successful!", "Please log in now.");
          form.resetFields();
        } else {
          showNotification("error", "Sign Up Failed", "Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      showNotification("warning", "Incomplete Details", "Please fill in all required fields before signing up.");
    } finally {
      setLoading(false);
    }
  };

  // **Login Logic**
  const onLogin = async () => {
    try {
      const values = await form.validateFields(["email", "password"]);
      setLoginLoading(true);

      // Check if user exists
      const response = await fetch(`${API_URL}?email=${values.email}`);
      const users = await response.json();

      if (users.length === 0) {
        showNotification("error", "User Not Found", "No account found with this email. Please sign up.");
      } else {
        const user = users[0];
        if (user.password === values.password) {
          // Store user details in localStorage
          localStorage.setItem("user", JSON.stringify(user));

          showNotification("success", "Login Successful!", "Welcome back to PrepXpert.");
          navigate("/dashboard"); // Redirect to Dashboard
        } else {
          showNotification("error", "Incorrect Password", "Please enter the correct password.");
        }
      }
    } catch (error) {
      showNotification("warning", "Incomplete Details", "Please enter your email and password.");
    } finally {
      setLoginLoading(false);
    }
  };

  // **Guest Login Logic**
  const onGuestLogin = async () => {
    try {
      setGuestLoading(true);

      const response = await fetch(`${API_URL}?email=guest@gmail.com`);
      const users = await response.json();

      if (users.length > 0) {
        const guestUser = users[0];

        // Store guest user details in localStorage
        localStorage.setItem("user", JSON.stringify(guestUser));

        showNotification("success", "Logged in as Guest", "You are logged in as a guest.");
        navigate("/dashboard"); // Redirect to Dashboard
      } else {
        showNotification("error", "Guest User Not Found", "Guest login failed. Try again.");
      }
    } catch (error) {
      showNotification("error", "Network Error", "Failed to login as guest. Please try again.");
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="start-your-journey">
      <div className="image-container">
        <img src="/img/pimgL.jpeg" alt="Start Your Journey" className="journey-image" />
      </div>

      <div className="form-container">
        <h2 className="form-title">Welcome to PrepXpert</h2>
        <p>Sign up or log in to continue.</p>

        <Form form={form} layout="vertical" requiredMark={false}>
          {/* Full Name (Signup Only) */}
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your full name!" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Signup Button */}
          <Form.Item>
            <Button type="primary" block onClick={onSignUp} loading={loading}>
              Sign Up
            </Button>
          </Form.Item>

          {/* Login Button */}
          <Form.Item>
            <Button type="default" block onClick={onLogin} loading={loginLoading}>
              Login
            </Button>
          </Form.Item>

          {/* Guest Login Button */}
          <Form.Item>
            <Button type="default" block onClick={onGuestLogin} loading={guestLoading}>
              Login as Guest
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default StartYourJourney;
