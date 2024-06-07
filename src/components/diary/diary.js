import React, { useEffect, useState } from 'react';
import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import { Icon } from '@iconify/react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import DiaryDetail from './diaryDetail';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    const navigate = useNavigate();

    const onClickDiaryWrite = () => {
        navigate('/diary/write');
    }

    const onClickDiaryDelete = () =>{
        navigate('/diary/delete');
    }

    return (
        <div className='header'>
            <div className='header-text-box'>
                <div className='text'>
                    <span className='text-month'>{format(currentMonth, 'M')}</span>
                    <span className='text-year'>{format(currentMonth, 'yyyy')}</span>
                    <div className='button'>
                        <Icon className='icon-left' icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                        <Icon className='icon-right' icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
                    </div>
                </div>
                <div className='diary-button'>
                    <div className='diary-write-button' onClick={onClickDiaryWrite}>생성하기</div>
                    <div className='diary-delete-button' onClick={onClickDiaryDelete}>삭제하기</div>
                </div>
            </div>
        </div>
    );
}

const RenderDate = () => {
    const days = [];
    const date = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className='rows-date' key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className='row-days'>{days}</div>;
}

const RenderDay = ({ currentMonth, selectedDate, onDateClick }) => {
    const startMonth = startOfMonth(currentMonth);
    const endMonth = endOfMonth(currentMonth);
    const startDay = startOfWeek(startMonth);
    const endDay = endOfWeek(endMonth);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/diary?command=readMonth&startMonth=${format(startMonth, 'yyyy-MM-dd HH:mm:ss')}&endMonth=${format(endMonth, 'yyyy-MM-dd HH:mm:ss')}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [currentMonth]);
    console.log(data);
    const rows = [];
    let days = [];
    let day = startDay;

    while (day <= endDay) {
        for (let i = 0; i < 7; i++) {
            const formatDay = format(day, 'd');
            const cloneDay = day;
            const isDisabled = !isSameMonth(day, currentMonth);
            const isSelected = isSameDay(day, selectedDate);
            const isNotValid = format(currentMonth, 'M') !== format(day, 'M');
            const isValid = !isDisabled && !isSelected && !isNotValid;
            
            days.push(
                <div
                    className={`rows-day ${
                        isDisabled ? 'disabled' : 
                        isSelected ? 'selected' : 
                        isNotValid ? 'not-valid' : 'valid'
                    }`}
                    key={day} 
                    onClick={() => onDateClick(cloneDay)}
                >
                    <span 
                        id={isNotValid ? 'text-not-valid' : ''}
                        className={i === 0 ? 'sunday' : i === 6 ? 'saturday' : ''}
                    >
                        {formatDay}
                    </span>
                    <div className='day-content'>
                        {data.filter(entry => format(new Date(entry.diary_date), 'yyyy-MM-dd') === format(cloneDay, 'yyyy-MM-dd')).map(filteredData => (
                            <div key={filteredData.id}>{filteredData.content}</div>
                        ))}
                    </div>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className='row' key={day}>{days}</div>
        );
        days = [];
    }
    return <div className='body'>{rows}</div>;
}

export default function Diary() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onDateClick = (day) => {
        setSelectedDate(day);
        openModal();
    }
    
    return (
        <div className='diary-box'>
            <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
            <RenderDate />
            <RenderDay currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} />
            <DiaryDetail isOpen={isModalOpen} onClose={closeModal} date={format(selectedDate, 'yyyy-MM-dd 12:mm:ss')} />
        </div>
    );
}
