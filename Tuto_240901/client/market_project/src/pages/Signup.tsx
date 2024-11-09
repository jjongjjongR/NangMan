import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const nav = useNavigate();
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태
  const [successMessage, setSuccessMessage] = useState(""); // 성공 메시지 상태

  const setSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/signUp",
        {
          param: [
            {
              email: ID,
              password: PW,
            },
          ],
        },
        { withCredentials: true }
      );

      console.log("API Response:", response.data); // 응답 데이터 확인

      // 응답 메시지에 따라 성공/실패 처리
      if (response.data.message) {
        if (response.data.message === "중복된 이메일입니다.") {
          setErrorMessage("중복된 이메일입니다.");
          setSuccessMessage(""); // 성공 메시지 초기화
        } else {
          // 성공적인 회원가입 후 처리
          setSuccessMessage("회원가입이 성공적으로 완료되었습니다.");
          setErrorMessage(""); // 에러 메시지 초기화
          setTimeout(() => nav("/"), 2000); // 2초 후 홈으로 이동
        }
      }
    } catch (err) {
      setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요."); // 기타 에러 처리
      setSuccessMessage(""); // 성공 메시지 초기화
      console.error("Signup error:", err);
    }
  };

  const toHome = () => {
    nav("/");
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={setSignup}>
        <input
          placeholder="ID"
          value={ID} // 입력값 제어
          onChange={(e) => setID(e.target.value)}
        />
        <p />
        <input
          placeholder="PW"
          value={PW} // 입력값 제어
          onChange={(e) => setPW(e.target.value)}
          type="password"
        />
        <p />
        <button type="submit">Sign up</button>
      </form>

      {/* 성공 메시지 출력 */}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}

      {/* 오류 메시지 출력 */}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <button onClick={toHome}>Home</button>
    </>
  );
}

export default Signup;
