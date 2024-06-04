import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './diaryWrite.css';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function DiaryWrite() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!content){
      alert('내용을 작성하세요');
      return;
    }
    if (!selectedDate) {
      alert('날짜를 선택하세요');
      return;
    }

    const formattedDate = format(selectedDate, 'yyyy-MM-dd 12:mm:ss');

    const formData = new URLSearchParams();
    formData.append('content', content);
    formData.append('date', formattedDate);
    // 게시글 데이터 처리 로직
    fetch(`${process.env.REACT_APP_SERVER_URL}/diary?command=write`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: formData
    })
    .then(data => {
        console.log(data);
        navigate('/diary'); // 새로고침
    })
    .catch(error => console.error('Error submitting form:', error));
      console.log({
        content,
        date: selectedDate ? format(selectedDate, 'yyyy-MM-dd 12:mm:ss') : null,
      });
  };
  return(
        <div className="diary-write">
          <div className='diary-write-title'>
          다이어리 작성
          </div>
            <form onSubmit={handleSubmit}>
              <div className='diary-write-content'>
                <label>내용</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
          <div className='diary-write-date'>
            <label>날짜</label>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="yyyy/MM/dd"
              isClearable
              placeholderText="날짜를 선택하세요"
              />
            {selectedDate && <div className='diary-write-date-selected'>선택한 날짜: {selectedDate.toLocaleDateString()}</div>}
              </div>
              <div className='diary-write-button-box'>
              <input type='submit' className='diary-write-button' value='생성하기'></input>
              </div>
          </form>
        </div>
  );
}
