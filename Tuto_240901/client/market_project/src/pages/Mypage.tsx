import { useNavigate } from "react-router-dom";

function Mypage() {
    const nav = useNavigate()
    
    const toHome = () => {
        nav("/")
    };

    return (
        <div>
            <h1>my page</h1>
            <button onClick={toHome}>Home</button>
        </div>
    );

}
export default Mypage;