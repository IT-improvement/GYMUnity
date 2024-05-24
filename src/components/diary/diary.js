import React, { useEffect, useState } from 'react';
import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import { Icon } from '@iconify/react';
import './style.css';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className='header'>
            <div className='header-text-box'>
                <div className='text'>
                    <span className='text-month'>{format(currentMonth, 'M')}</span>
                    <span className='text-year'>{format(currentMonth, 'yyyy')}</span>
                </div>
                <div className='button'>
                    <Icon className='icon' icon="bi:arrow-left-circle-fill" onClick={prevMonth}></Icon>
                    <Icon className='icon' icon="bi:arrow-right-circle-fill" onClick={nextMonth}></Icon>
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

    return <div className='row-days'>{days}</div>
}

const RenderDay = ({ currentMonth, selectedDate, onDateClick }) => {
    const startMonth = startOfMonth(currentMonth);
    const endMonth = endOfMonth(startMonth);
    const startDay = startOfWeek(startMonth);
    const endDay = endOfWeek(endMonth);

    const rows = [];
    let days = [];
    let day = startDay;
    let formatDay = '';

    while (day <= endDay) {
        for (let i = 0; i < 7; i++) {
            formatDay = format(day, 'd');
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
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className='row' key={day}>{days}</div>
        );
        days = [];
    }
    return (
        <div className='body'>{rows}</div>
    );
}

export default function Diary() {
    const [data, setData] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const onDateClick = (day) => {
        setSelectedDate(day);
        console.log(data);
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/diary?command=read&date=${format(selectedDate, 'yyyy-MM-dd')}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [selectedDate]);

    return (
        <div className='diary-box'>
            <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
            <RenderDate />
            <RenderDay currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} />
        </div>
    );
}
