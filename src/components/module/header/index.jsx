import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

//       component: 헤더 레이아웃        //
export default function Header() {

    //        function: 네비게이트 함수      //
    const navigate = useNavigate();


    //        event handler: 로고 클릭 이벤트 처리 함수      //
    const onLogoClickHandler = () =>{
    }

    //       component: 검색 버튼 컴포넌트         //
    const SearchButton = () =>{

        //       state: 검색 버튼 상태        //

        //       render: 검새 버튼 컴포넌트  랜더링      //
        return(
            <div className='icon-button'>
                <div className='icon search-light-icon'></div>
            </div>
        );
    }
    
    //       render: 헤더 레이아웃  랜더링      //
    return (
    <div id='header'>
        <div className='header-container'>
            <div className='header-left-box' onClick={onLogoClickHandler}>
                <div className='icon-box'>
                    <div className='icon logo-dark-icon'></div>
                </div>
                <div className='header-logo'>{'GYMUnity'}</div>
            </div>
            <div className='header-right-box'>
                <SearchButton/>
            </div>
        </div>
    </div>
    )
}

