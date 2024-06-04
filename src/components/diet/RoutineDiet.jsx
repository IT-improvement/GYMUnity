import React, { useEffect, useState } from "react";
import "./routineDiet.css";
import RoutineDietCreate from "./routineDietCreate";

export default function RoutineDiet() {
  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //      state: 삭제 버튼 활성화 상태     //
  const [status, setStatus] = useState(false);
  //      state: 체크박스 선택 상태     //
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/routineDiet?command=read`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBreakfast(data.filter((item) => item.meal === "아침"));
        setLunch(data.filter((item) => item.meal === "점심"));
        setDinner(data.filter((item) => item.meal === "저녁"));
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
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
                    value={item.routineDietIndex + "/" + item.foodIndex}
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
        fetch(
          `${process.env.REACT_APP_SERVER_URL}/routineDiet?command=delete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: selectedItems }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
          })
          .then((data) => {
            window.location.reload();
          })
          .catch((error) => {
            console.error(
              "There was a problem with the delete operation:",
              error
            );
          });
      }
      setSelectedItems([]);
    }
    setStatus(!status);
  };

  return (
    <div className="routine-box">
      <RoutineDietCreate isOpen={isModalOpen} onClose={closeModal} />
      <div className="routine-top">
        <div className="routine-title">식단</div>
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
          <table className="routine-schedule">
            <tbody>
              <tr>
                <td>구분</td>
                {days.map((day, index) => (
                  <td key={index}>{day}</td>
                ))}
              </tr>
              {renderRows(breakfast, "아침")}
              {renderRows(lunch, "점심")}
              {renderRows(dinner, "저녁")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
