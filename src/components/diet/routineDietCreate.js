import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./routineDietCreate.css";
import Context from "../../Context";

const RenderExercise = ({ onChangeCategory }) => {
  return (
    <div className="routine-create-category-box">
      <select name="meal_time" onChange={onChangeCategory}>
        <option value="" disabled selected>
          카테고리 선택
        </option>
        <option value="1">아침</option>
        <option value="2">점심</option>
        <option value="3">저녁</option>
      </select>
    </div>
  );
};

export default function RoutineDietCreate({ isOpen, onClose }) {
  const [foods, setFoods] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState("");
  const [formValues, setFormValues] = useState({
    day: "",
    meal_time: "",
    food: "",
    command: "write",
  });

  const navigate = useNavigate();
  const { isLoggedIn, sessionUser } = useContext(Context);

  const RenderSelect = ({ categoryIndex }) => {
    console.log("categoryIndex:" + categoryIndex);
    console.log(foods);
    return (
      <div className="routine-create-category-box">
        <select name="food" onChange={handleChange} value={formValues.food}>
          <option value="" disabled>
            음식 선택
          </option>
          {foods.map((item) => (
            <option key={item.foodIndex} value={item.foodIndex}>
              {item.foodName}
            </option>
          ))}
        </select>
      </div>
    );
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/food/service?command=readFoodList&userCode=${sessionUser.code}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFoods(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!isOpen) {
    return null;
  }

  const onChangeCategory = (event) => {
    const { value } = event.target;
    setCategoryIndex(value);
    setFormValues((prevValues) => ({
      ...prevValues,
      meal_time: value === "1" ? "아침" : value === "2" ? "점심" : "저녁",
      food: "",
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new URLSearchParams(formValues).toString();
    console.log("meal_time" + formValues.meal_time);
    if (!formValues.day) {
      alert("요일을 선택하세요");
      return;
    }
    if (!formValues.meal_time) {
      alert("카테고리를 선택하세요");
      return;
    }
    if (!formValues.food) {
      alert("음식을 선택하세요");
      return;
    }
    console.log(formData);
    fetch(`${process.env.REACT_APP_SERVER_URL}/routineDiet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: formData,
    })
      .then((data) => {
        console.log(data);
        onClose(); // 창 닫기
        navigate("/routineDiet", { replace: true }); // 새로고침
        window.location.reload();
      })
      .catch((error) => console.error("Error submitting form:", error));
  };

  return (
    <div className="routine-create">
      <div className="routine-create-box">
        <div className="routine-close-button">
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="routine-create-content">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="command" value="write"></input>
            <div className="routine-create-category-box">
              <select name="day" onChange={handleChange} value={formValues.day}>
                <option value="" disabled selected>
                  요일 선택
                </option>
                <option value="Mo">월요일</option>
                <option value="Tu">화요일</option>
                <option value="We">수요일</option>
                <option value="Th">목요일</option>
                <option value="Fr">금요일</option>
                <option value="Sa">토요일</option>
                <option value="Su">일요일</option>
              </select>
            </div>

            <RenderExercise onChangeCategory={onChangeCategory} />
            <RenderSelect categoryIndex={categoryIndex} />
            <div className="routine-create-button-box">
              <input
                type="submit"
                value="생성하기"
                className="routine-create-button"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
