import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './createDietForm.css';
import Context from '../../Context';

const RenderExercise = ({ onChangeCategory }) => {
    return (
        <div className="routine-create-category-box">
            <select name="category" onChange={onChangeCategory}>
                <option value="" disabled selected>
                    선택
                </option>
                <option value="1">아침</option>
                <option value="2">점심</option>
                <option value="3">저녁</option>
            </select>
        </div>
    );
};

export default function RoutineCreate({ isOpen, onClose }) {
    const [data, setData] = useState([]);
    const [categoryIndex, setCategoryIndex] = useState('');
    const { isLoggedIn, sessionUser } = useContext(Context);
    const [formValues, setFormValues] = useState({
        day: '',
        category: '',
        food: '',
        foodIndex: '',
        totalCalories: 0,
        totalProtein: 0,
        userCode: sessionUser.code,
        command: 'write',
    });

    const navigate = useNavigate();

    const RenderSelect = ({ foodIndex }) => {
        return (
            <div className="routine-create-category-box">
                <select name="food" onChange={handleChange} value={formValues.food}>
                    <option value="" disabled>
                        음식 선택
                    </option>
                    {data.map((item) => (
                        <option key={item.food_Index} value={item.food_Index}>
                            {item.foodName}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/food/service?command=readFoodList&userCode=${sessionUser.code}`)
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
    }, [sessionUser.code]);

    if (!isOpen) {
        return null;
    }

    const onChangeCategory = (event) => {
        const { value } = event.target;
        setCategoryIndex(value);
        setFormValues((prevValues) => ({
            ...prevValues,
            category: value,
            food: '',
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'food') {
            const selectedFoodIndex = parseInt(value);
            const selectedFood = data.find((item) => item.food_Index === selectedFoodIndex);
            if (selectedFood) {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    [name]: value,
                    foodIndex: selectedFoodIndex,
                    totalCalories: selectedFood.totalCalories,
                    totalProtein: selectedFood.totalProtein,
                }));
            } else {
                console.error('Selected food not found in data array');
                // 혹은 사용자에게 오류 메시지 표시
            }
        } else {
            setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = JSON.stringify(formValues);
        if (!formValues.day) {
            alert('요일을 선택하세요');
            return;
        }
        if (!formValues.food) {
            alert('음식을 선택하세요');
            return;
        }
        fetch(`${process.env.REACT_APP_SERVER_URL}/diet/service?command=createDiet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('data:', data);
                onClose(); // 창 닫기
                navigate('/diet', { replace: true }); // 새로고침
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
                        <RenderSelect foodIndex={categoryIndex} />
                        <div className="routine-create-button-box">
                            <input type="submit" value="생성하기" className="routine-create-button"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
