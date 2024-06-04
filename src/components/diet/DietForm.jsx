import React, { useEffect, useState, useContext } from "react";
import "./dietForm.css";
import Context from "../../Context";
import CreateFoodForm from "./createDietForm";

export default function Routine() {
  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const [top, setTop] = useState([]);
  const [bottom, setBottom] = useState([]);
  const [aerobic, setAerobic] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, sessionUser } = useContext(Context);

  //      state: 삭제 버튼 활성화 상태     //
  const [status, setStatus] = useState(false);
  //      state: 체크박스 선택 상태     //
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (sessionUser) {
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/diet/service?command=readAllDiet&userCode=${sessionUser.code}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setTop(data.filter((item) => item.category === "아침"));
          setBottom(data.filter((item) => item.category === "점심"));
          setAerobic(data.filter((item) => item.category === "저녁"));
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, [sessionUser]);

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

  // render: 요일별 식단 랜더링
  const renderRows = (categoryData, categoryName) => (
    <tr key={categoryName}>
      <td>{categoryName}</td>
      {days.map((day, index) => (
        <td key={index}>
          {categoryData
            .filter((item) => item.day === day)
            .map((item) => (
              <div key={item.routineIndex + "-" + item.exerciseIndex}>
                {status && (
                  <input
                    type="checkbox"
                    name="index"
                    value={item.routineIndex + "/" + item.exerciseIndex}
                    onChange={handleCheckboxChange}
                  />
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
          `${process.env.REACT_APP_SERVER_URL}/diet/service?command=deleteDiet&dietIndex=${sessionUser.code}`,
          {
            method: "GET",
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
      <CreateFoodForm isOpen={isModalOpen} onClose={closeModal} />
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
              {renderRows(top, "아침")}
              {renderRows(bottom, "점심")}
              {renderRows(aerobic, "저녁")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
