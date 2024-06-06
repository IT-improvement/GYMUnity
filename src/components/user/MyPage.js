import { Link } from 'react-router-dom';
import ButtonLogout from "./ButtonLogout";

const MyPage = () => {
    return (
        <div style={{ width: '100%', height: 'auto', display: 'flex', marginTop: '100px', justifyContent: 'center' }}>
            <div>
                <hr style={{border: '1px solid darkgray', marginTop: '15px', marginBottom: '15px'}} />
                <Link to="../update" style={{fontSize: '25px'}}>• 회원정보 수정</Link>
                <hr style={{border: '1px solid darkgray', width: '200px', marginTop: '15px', marginBottom: '15px'}} />

                <ButtonLogout />

                <hr style={{border: '1px solid darkgray', width: '200px', marginTop: '15px', marginBottom: '15px'}} />
                <Link to="../leave" style={{fontSize: '25px'}}>• 회원 탈퇴</Link>
                <hr style={{border: '1px solid darkgray', marginTop: '15px', marginBottom: '15px'}} />
            </div>
        </div>
    );
};

export default MyPage;