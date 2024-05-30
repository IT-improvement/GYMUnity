import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JoinForm.css';

const JoinForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [telecom, setTelecom] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const submitJoin = async (e) => {
        e.preventDefault();

        try {
            
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    password: password,
                    name: name,
                    email: email,
                    birth: birth,
                    gender: gender,
                    telecom: telecom,
                    phone: phone
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const result = await response.json();
            console.log('User created: ', result);

            if (result.status === 200) {
                alert('회원가입 완료');
                navigate('/');
            } else {
                alert('Failed to join');
            }

        } catch (error) {
            console.error('Error: ', error);
        }

        console.log(`${process.env.REACT_APP_SERVER_URL}`);
        console.log(id);
        console.log(password);
        console.log(name);
        console.log(email);
        console.log(birth);
        console.log(gender);
        console.log(telecom);
        console.log(phone);
    };

    useEffect(() => {

    }, []);

    return (
        <div id="join-container">
            <h2>회원가입</h2>
            <form method="POST" onSubmit={submitJoin}>
                <div>
                    <label htmlFor="id">아이디</label>
                    <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="name">이름</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="birth">생년월일</label>
                    <input type="text" id="birth" value={birth} placeholder="생년월일 8자리" onChange={(e) => setBirth(e.target.value)} required />
                </div>
                <div>
                    <label>성별</label>
                    <div id="radio-container">
                        <input type="radio" class="gender" id="gender-man" name="gender" value="M" onChange={(e) => setGender(e.target.value)} />
                        <input type="radio" class="gender" id="gender-woman" name="gender" value="F" onChange={(e) => setGender(e.target.value)} />
                        <div>
                            <label for="gender-man" id="gender-man-label"><div>남자</div></label>
                            <label for="gender-woman" id="gender-woman-label"><div>여자</div></label>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="telecom">통신사</label>
                    <select id="telecom" value={telecom} onChange={(e) => setTelecom(e.target.value)} required>
                        <option value="" selected disabled>통신사 선택</option>
                        <option value="skt">SKT</option>
                        <option value="kt">KT</option>
                        <option value="lgt">LGU+</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="phone">휴대폰 번호</label>
                    <input type="text" id="phone" placeholder="000-0000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <button id="submit" type="submit" value="회원가입">가입</button>
            </form>
        </div>
    );
};

export default JoinForm;
