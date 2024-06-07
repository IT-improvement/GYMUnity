import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './routineCreate.css';

const RenderExercise = ({ onChangeCategory }) => {
    return (
        <div className="routine-create-category-box">
            <select name="category" onChange={onChangeCategory}>
                <option value="" disabled selected>
                    카테고리 선택
                </option>
                <option value="1">상체</option>
                <option value="2">하체</option>
                <option value="3">유산소</option>
            </select>
        </div>
    );
};

export default function RoutineCreate({ isOpen, onClose }) {
    const [data, setData] = useState([]);
    const [categoryIndex, setCategoryIndex] = useState('');
    const [formValues, setFormValues] = useState({
        day: '',
        category: '',
        exercise: '',
        command: 'write',
    });

    const navigate = useNavigate();

    const RenderSelect = ({ categoryIndex }) => {
        console.log('categoryIndex:' + categoryIndex);
        console.log('data:' + data);
        return (
            <div className="routine-create-category-box">
                <select name="exercise" onChange={handleChange} value={formValues.exercise}>
                    <option value="" disabled>
                        운동종류 선택
                    </option>
                    {data
                        .filter((json) => json.exercise_category_index === parseInt(categoryIndex))
                        .map((item) => (
                            <option key={item.exercise_index} value={item.exercise_index}>
                                {item.name}
                            </option>
                        ))}
                </select>
            </div>
        );
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises/?command=read_userCode`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    if (!isOpen) {
        return null;
    }

    const onChangeCategory = (event) => {
        const { value } = event.target;
        setCategoryIndex(value);
        setFormValues((prevValues) => ({
            ...prevValues,
            category: value,
            exercise: '',
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new URLSearchParams(formValues).toString();
        if (!formValues.day) {
            alert('요일을 선택하세요');
            return;
        }
        if (!formValues.exercise) {
            alert('운동을 선택하세요');
            return;
        }
        fetch(`${process.env.REACT_APP_SERVER_URL}/routine?command=write`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData,
        })
            .then((data) => {
                console.log(data);
                onClose(); // 창 닫기
                navigate('/routine', { replace: true }); // 새로고침
                window.location.reload();
            })
            .catch((error) => console.error('Error submitting form:', error));
    };

    return (
        <div className="routine-create">
            <div className="routine-create-box">
                <div className="routine-close-button">
                    <button className="close-button" onClick={onClose}>
                        X
                    </button>
                </div>
                <div className="routine-create-content">
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="command" value="write"></input>
                        <div className="routine-create-category-box">
                            <select name="day" onChange={handleChange} value={formValues.day}>
                                <option value="" disabled selected>
                                    요일 선택
                                </option>
                                <option value="Mo">월요일</option>
                                <option value="Tu">화요일</option>
                                <option value="We">수요일</option>
                                <option value="Th">목요일</option>
                                <option value="Fr">금요일</option>
                                <option value="Sa">토요일</option>
                                <option value="Su">일요일</option>
                            </select>
                        </div>
                        <RenderExercise onChangeCategory={onChangeCategory} />
                        <RenderSelect categoryIndex={categoryIndex} />
                        <div className="routine-create-button-box">
                            <input type="submit" value="생성하기" className="routine-create-button"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
