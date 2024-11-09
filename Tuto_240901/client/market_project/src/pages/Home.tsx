import { useNavigate } from "react-router-dom";

export default function Home() {
    const nav = useNavigate()

    const toLogin = () => {
        nav("/login")
    };

    const toMypage = () => {
        nav("/mypage")
    };
    
    return (
        <div>
            <button onClick={toLogin}>Login</button>
            <button onClick={toMypage}>Mypage</button>
        </div>
    );
}