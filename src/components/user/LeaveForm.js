import React, { useState } from 'react';
import "./LeaveForm.css";

const LeaveForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const submitLeave = async (e) => {
        e.preventDefault();
        const formData = {
            id,
            password
        };

        if (isChecked) {
            console.log('탈퇴처리 완료');
        } else {
            console.log('탈퇴처리 실패');
        }
    }

    return (
        <div id="leave-container">
            <h2>회원탈퇴</h2>
            <form method="DELETE" onSubmit={submitLeave}>
                <div>
                    <div id="id" style={{ marginTop: '20px', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
                            <label style={{ width: '100px', paddingLeft: '5px', fontWeight: 'bold' }}>아이디</label>
                            <span>{id}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
             <div id="confirm">
                        <input type="checkbox" id="check-box" checked={isChecked} onChange={handleCheckboxChange} />
                        <label id="check-label"><span>탈퇴를 확인합니다.</span></label>
                </div>
                <button id="submit" type="submit" value="회원탈퇴">탈퇴</button>
            </form>

        </div>
    );
};

export default LeaveForm;