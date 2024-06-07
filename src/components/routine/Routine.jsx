import React, { useEffect, useState } from 'react';
import './routine.css';
import RoutineCreate from './routineCreate';

export default function Routine() {
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const [top, setTop] = useState([]);
    const [bottom, setBottom] = useState([]);
    const [aerobic, setAerobic] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //      state: 삭제 버튼 활성화 상태     //
    const [status, setStatus] = useState(false);
    //      state: 체크박스 선택 상태     //
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/routine?command=read`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setTop(data.filter((item) => item.category === '상체'));
                setBottom(data.filter((item) => item.category === '하체'));
                setAerobic(data.filter((item) => item.category === '유산소'));
                console.log(top);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedItems([...selectedItems, value]);
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== value));
        }
    };

    //       render: 요일별 운동 랜더링        //
    const renderRows = (categoryData, categoryName) => (
        <tr>
            <td>{categoryName}</td>
            {days.map((day, index) => (
                <td key={index}>
                    {categoryData
                        .filter((item) => item.day === day)
                        .map((item) => (
                            <div>
                                {status && (
                                    <input
                                        type="checkbox"
                                        name="index"
                                        value={item.routineIndex + '/' + item.exerciseIndex}
                                        onChange={handleCheckboxChange}
                                    ></input>
                                )}
                                {item.name}
                            </div>
                        ))}
                </td>
            ))}
        </tr>
    );

    //        event handler: 생성 버튼 클릭 이벤트 처리 함수        //
    const onClickCreateButton = () => {
        openModal();
    };

    //        event handler: 삭제 버튼 클릭 이벤트 처리 함수        //
    const onClickDeleteButton = () => {
        if (status) {
            if (selectedItems.length > 0) {
                fetch(`${process.env.REACT_APP_SERVER_URL}/routine?command=delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ items: selectedItems }),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                    })
                    .then((data) => {
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.error('There was a problem with the delete operation:', error);
                    });
            }
            setSelectedItems([]);
        }
        setStatus(!status);
    };
    return (
        <div className="routine-box">
            <RoutineCreate isOpen={isModalOpen} onClose={closeModal} />
            <div className="routine-top">
                <div className="routine-title">루틴</div>
                <div className="routine-button">
                    <div className="routine-write-button" onClick={onClickCreateButton}>
                        생성하기
                    </div>
                    <div className="routine-delete-button" onClick={onClickDeleteButton}>
                        삭제하기
                    </div>
                </div>
            </div>
            <div className="routine-content">
                <div className="routine">
                    <table>
                        <tbody>
                            <tr>
                                <td>구분</td>
                                {days.map((day, index) => (
                                    <td key={index}>{day}</td>
                                    ))}
                                </tr>
                            {renderRows(top, '상체')}
                            {renderRows(bottom, '하체')}
                            {renderRows(aerobic, '유산소')}
                                </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
