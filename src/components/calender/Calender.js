import React from 'react'
import '../style/Calender.css'

export default function Calender() {
    const data=[];
    for(let i = 1;i<=12;i++){
            data.class=i;
            data.time=i+8;
    }
  return (
    <div>
        <table className='schedule'>
            <thead>
                <tr>
                    <td></td>
                    <td>월</td>
                    <td>화</td>
                    <td>수</td>
                    <td>목</td>
                    <td>금</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div className='schedule-class'>1교시</div>
                        <div className='schedule-time'>9시</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <div className='schedule-class'>2교시</div>
                        <div className='schedule-time'>10시</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <div className='schedule-class'>3교시</div>
                        <div className='schedule-time'>11시</div>
                    </td>
                    <td></td>
                    <td rowSpan={2}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <div className='schedule-class'>4교시</div>
                        <div className='schedule-time'>12시</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <div className='schedule-class'>5교시</div>
                        <div className='schedule-time'>13시</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <div className='schedule-class'>6교시</div>
                        <div className='schedule-time'>14시</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <div className='schedule-class'>7교시</div>
                        <div className='schedule-time'>15시</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <div className='schedule-class'>8교시</div>
                        <div className='schedule-time'>16시</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <div className='schedule-class'>9교시</div>
                        <div className='schedule-time'>17시</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <div className='schedule-class'>10교시</div>
                        <div className='schedule-time'>18시</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <div className='schedule-class'>11교시</div>
                        <div className='schedule-time'>19시</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <div className='schedule-class'>12교시</div>
                        <div className='schedule-time'>20시</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}