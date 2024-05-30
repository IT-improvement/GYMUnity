import React from 'react';
import { Link } from 'react-router-dom';

const MyPage = () => {
    return (
        <div style={{ height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
            <hr style={{border: '1px solid darkgray', marginTop: '15px', marginBottom: '15px'}} />
                <Link to="../update" style={{fontSize: '25px'}}>• 회원정보 수정</Link>
                <hr style={{border: '1px solid darkgray', width: '200px', marginTop: '15px', marginBottom: '15px'}} />
                <Link to="/" style={{fontSize: '25px'}}>• 회원 탈퇴</Link>
                <hr style={{border: '1px solid darkgray', marginTop: '15px', marginBottom: '15px'}} />
            </div>
        </div>
    );
};

export default MyPage;