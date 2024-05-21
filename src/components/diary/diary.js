import React, { Component, useState } from 'react'
import {addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, parse, startOfMonth, startOfWeek, subMonths} from 'date-fns'
import {Icon} from '@iconify/react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';

// 년월 랜더링
const RenderHeader = ({currentMonth, prevMonth, nextMonth}) =>{
    return(
        <div className='header'>
            <div className='header-text-box'>
                <div className='text'>
                    <span className='text-month'>{format(currentMonth,'M')}</span>
                    <span className='text-year'>{format(currentMonth,'yyyy')}</span>
                </div>
                <div className='button'>
                    <Icon className='icon' icon="bi:arrow-left-circle-fill" onClick={prevMonth}></Icon>
                    <Icon className='icon' icon="bi:arrow-right-circle-fill" onClick={nextMonth}></Icon>
                </div>
            </div>
        </div>
    )
}

// 요일 랜더링
const RenderDate = () =>{
    const days = [];
    const date = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    for(let i = 0 ; i<7;i++){
        days.push(
            <div className='rows-date' key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className='row-days'>{days}</div>
}

const RenderDay = ({currentMonth, selectedDate, onDateClick }) =>{
    const startMonth = startOfMonth(currentMonth);
    const endMonth = endOfMonth(startMonth);
    const startDay = startOfWeek(startMonth);
    const endDay = endOfWeek(endMonth);

    const rows = [];
    let days = [];
    let day = startDay;
    let formatDay='';

    while(day<=endDay){
        for(let i = 0 ;i<7;i++){
            formatDay =format(day,'d');
            const cloneDay = day;
            days.push(
                <div className={`rows-day ${
                    !isSameMonth(day, currentMonth)?'disabled' : 
                    isSameDay(day, selectedDate)?'selected' : 
                    format(currentMonth, 'M') !== format(day, 'M')? 'not-valid' : 'valid'
                }`}
                key={day} onClick={()=> onDateClick(cloneDay)}>
                    <span className={format(currentMonth, 'M') !== format(day, 'M')?'text-not-valid':''}>
                    {formatDay}
                    </span>
                </div>
            );
            day = addDays(day,1);
        }
        rows.push(
            <div className='row' key={day}>{days}</div>
        );
        days = [];
    }
    return(
        <div className='body'>{rows}</div>
    )
}

export default function Diary() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () =>{
        setCurrentMonth(subMonths(currentMonth, 1));
        console.log(selectedDate);
    };
    const nextMonth = () =>{
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) =>{
        setSelectedDate(day);
        console.log(selectedDate);
        window.location.href = `${process.env.REACT_APP_SERVER_URL}/diary?date=${selectedDate}`;
    }

    return (
    <div className='diary-box'>
        <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth}/>
        <RenderDate/>
        <RenderDay currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick}/>
    </div>
    );
}
