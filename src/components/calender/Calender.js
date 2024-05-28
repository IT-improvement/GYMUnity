import React, { useEffect } from 'react'
import './calender.css'

export default function Calender() {
    const days = ["월", "화", "수", "목", "금"];

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/calender?command=diar`)
    },[])
    
    return (
        <div>
            <table className='schedule'>
                <thead>
                    <tr>
                        <td></td>
                        {days.map((day, index) => (
                            <td key={index}>{day}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    )
}
