import React, { useEffect, useState } from 'react';
import './diaryDelete.css';
import { format } from 'date-fns';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
export default function DiaryDelete() {
    const [number, setNumber] = useState('1');
    const [data, setData] = useState([]);
    const [end, setEnd] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/diary?command=readGroup&number=${number}`,{
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            setData(responseData.diaries);
            setEnd(responseData.end);
            })
            .catch(error => {
            
            console.error('Error fetching data:', error);
        });
    }, [number]);
    console.log(data);
    console.log(end);
    const onPrevNumber = () => {
        if(number ==='1'){
            alert('첫번째 페이지입니다.')
            return;
        }
        setNumber(parseInt(number)-1);
    }

    const onNextNumber = () => {
        if(end===true){
            alert('마지막 페이지입니다.')
            return;
        }
        setNumber(parseInt(number)+1);
    }

    const handleCheckboxChange = (event) =>{
        const { value, checked } = event.target;
        if (checked) {
            setSelectedItems([...selectedItems, value]);
        } else {
            setSelectedItems(selectedItems.filter(item => item !== value));
        }
    }
    const onDeleteRender = () =>{
        if (selectedItems.length > 0) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/diary?command=delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                body: JSON.stringify({ items: selectedItems }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                })
                .then(data => {
                    window.location.reload();
                })
                .catch(error => {
                    console.error('There was a problem with the delete operation:', error);
                });
        }
    }

    return (
        <div className="container">
            <div className='diary-delete'>
            <div className='diary-delete-button' onClick={onDeleteRender}>삭제하기</div>
            </div>
            <div className='diary-content-box'>
                <div className='diary-content-guide'>
                    <div className='checkbox'>선택</div>
                    <div className='content'>내용</div>
                    <div className='date'>날짜</div>
                </div>

                {data.map(diary => (
                    <div key={diary.diary_index} className='diary-content'>
                        <div className='checkbox'>
                            <input type='checkbox' name='index' 
                            value={diary.diary_index}
                            onChange={handleCheckboxChange}></input>
                        </div>
                        <div className='content'>{diary.content}</div>
                        <div className='date'>{format(new Date(diary.diary_date), 'yyyy-MM-dd')}</div>
                    </div>
                ))}
                <div className='button-box'>
                <FaArrowLeft  className='button' onClick={onPrevNumber}/>
                <FaArrowRight className='button' onClick={onNextNumber}/>
                </div>
            </div>
        </div>
    );
};

