import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./LeaveForm.css";

const LeaveForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const { code } = useParams();
    const [user, setUser] = useState(true);
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const submitLeave = async (e) => {
        e.preventDefault();

        if (!password) {
            alert('비밀번호 입력은 필수입니다.');
            return;
        }
        if (!isChecked) {
            alert('탈퇴 확인 체크는 필수입니다.');
            return;
        }
        
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=leave`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user.id,
                    password: password
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const result = await response.json();
            // let result = null;
            // try {
            //     result = await response.json();
            // } catch (error) {
            //     console.error('Error parsing JSON response:', error);
            //     throw new Error('Failed to parse JSON response');
            // }

            console.log('User leave: ', result);
            
            if (result.status === 200) {
                alert('회원탈퇴 완료');
                navigate('/');
            } else {
                alert('Failed to leave');
                navigate('/');
            }

        } catch (error) {
            console.error('Error: ', error);
        }

        console.log(`${process.env.REACT_APP_SERVER_URL}`);
        console.log(id);
        console.log(password);
    }

    useEffect(() => {
        console.log(code);
        fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=read_one&code=${code}`)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [code]);

    if (!user) {
        console.log('해당 유저를 불러오는 중..');
    }

    return (
        <div id="leave-container">
            <h2>회원탈퇴</h2>
            <form method="DELETE" onSubmit={submitLeave}>
                <div>
                    <div id="id" style={{ marginTop: '20px', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
                            <label style={{ width: '100px', paddingLeft: '5px', fontWeight: 'bold' }}>아이디</label>
                            <span>{user.id}</span>
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