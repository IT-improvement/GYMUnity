import React, { useEffect, useState } from 'react'
import './diaryDetail.css'

export default function DiaryDetail({isOpen, onClose, date}) {
    const [data, setData] = useState([]);
    console.log(date);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/diary?command=readDay&date=${date}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setData(data)
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    },[date])

    if (!isOpen) {
        return null;
    }
    return (
        <div className="diary-detail-box">
            <div className="diary-detail">
                <div className='diary-detail-button'>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className='diary-detail-content-box'>
                    <div className='diary-detail-content-title'>내용</div>
                    {data.map((item)=>
                    <div className='diary-detail-content'>{item.content}</div>
                    )}
                </div>
            </div>
        </div>
    )
}
