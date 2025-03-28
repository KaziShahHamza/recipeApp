import React, { useState } from "react";
import Form from "./Form";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("entered handleSubmit");
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      console.log("registration completed");
      alert("Registration completed, now login to continue");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={handleSubmit}
    />
  );
};

export default Register;
