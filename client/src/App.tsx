import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

interface Form {
  userEmail: string,
  password: string
}

function App() {
  const [token, setToken] = useState<string>("");
  const [form, setForm] = useState<Form>({
    userEmail: "",
    password: ""
  })
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // initialize default database userData
    setForm({
      userEmail: "user@example.com",
      password: "firstkey123"
    })
  }, []);

  useEffect(() => {
    setError("")
  }, [form]);

  const updateData = async () => {
    const { userEmail, password } = form
    try {
      const response = await fetch(`${API_URL}/${userEmail}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password })
      });

      const { message } = await response.json()

      if(response.ok) alert(message);
    } catch (error) {
      alert("Failed: data not updated");
      console.log('error', error)
    }    
  };

  const verifyData = async () => {
    setToken("")
    try {
      const response = await fetch(`${API_URL}/authenticate`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      });

      const { token, error } = await response.json();
      if (response.ok && token) {
        setToken(token)
        setError("")
        alert("Logged in, now you can update!")
      }
      else if (error) setError(error)     

    } catch (error) {
      alert("Failed to verify data.");
      console.log('erro')
    }
  };

  const { userEmail, password } = form
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <div>Saved Data</div>
      <label
        style={{ fontSize: "18px" }}
      >Email</label>
      <input
        style={{ fontSize: "30px" }}
        type="text"
        value={userEmail}
        onChange={(e) => setForm({ ...form, userEmail: e.target.value})}
        />
      <label
        style={{ fontSize: "18px" }}
      >Password</label>
      <input
        style={{ fontSize: "30px" }}
        type="text"
        value={password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      {error && <div style={{ fontSize: "16px", color: "red" }}>{error}</div>}
      <div style={{ display: "flex", gap: "10px" }}>
        <button 
          disabled={!token}
          style={{ fontSize: "20px" }} onClick={updateData}>
          Update Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={verifyData}>
          Verify Data
        </button>
      </div>
    </div>
  );
}

export default App;
