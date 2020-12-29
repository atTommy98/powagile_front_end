// React
import React, { useState } from "react";

// CSS
import "./FourLsRetro.css";

//Customer Component
import Card from "../../components/CardRetro";
import CheckboxList from "./instructions";
import Timer from "../../components/Timer/Timer";

function FourLsRetro() {
  // const [categories, setCategories] = useState({
  //   wentWell: [],
  //   toImprove: [],
  //   actionItems: [],
  // });
  const [retroActive, setRetroActive] = useState(false);
  const [instructions, setInstructions] = useState(false);
  const [addClass, setAddClass] = useState(false);
  // const [userInput, setUserInput] = useState("");
  const [id, setId] = useState(0);
  const [Cards, setCards] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislike] = useState(0);

  function newUserInput(e, idx) {
    let newCards = [...Cards];
    newCards[idx].input = e.target.value;
    setCards(newCards);
  }

  function validateInput(e) {
    if (e.target.value === "") {
      window.alert("input required");
    }
  }
  function deleteFn(id) {
    let deleteCards = Cards.filter((card) => card.id !== id);
    setCards(deleteCards);
  }

  function createCard(type, input) {
    setCards([
      ...Cards,
      {
        id: id,
        type: type,
        input: input,
        likes: 0,
        dislikes: 0,
      },
    ]);
    setId(id + 1);
  }

  function moveLeft(id, idx) {
    let newCards = [...Cards];
    for (let card of newCards) {
      if (card.id === id && card.type === "Went Well") {
        card.type = "Action Items";
      } else if (card.id === id && card.type === "To Improve") {
        card.type = "Went Well";
      } else if (card.id === id && card.type === "Action Items") {
        card.type = "To Improve";
      }
    }
    newCards.push(newCards[idx]);
    newCards.splice(idx, 1);
    setCards(newCards);
  }

  function moveRight(id, idx) {
    let newCards = [...Cards];
    for (let card of newCards) {
      if (card.id === id && card.type === "Went Well") {
        card.type = "To Improve";
      } else if (card.id === id && card.type === "To Improve") {
        card.type = "Action Items";
      } else if (card.id === id && card.type === "Action Items") {
        card.type = "Went Well";
      }
    }
    newCards.push(newCards[idx]);
    newCards.splice(idx, 1);
    setCards(newCards);
  }

  function handleLikes(idx) {
    let newCards = [...Cards];
    setLikes(newCards[idx].likes++);
    setCards(newCards);
    console.log(likes);
  }

  function handleDislikes(idx) {
    let newCards = [...Cards];
    setDislike(newCards[idx].dislikes++);
    setCards(newCards);
    console.log(dislikes);
  }

  function toggle() {
    if (addClass === 2) {
      setAddClass(0);
    } else {
      setAddClass(addClass + 1);
    }
  }
  function startInstructions() {
    setInstructions(true);
  }
  function startRetro() {
    setRetroActive(true);
    setInstructions(false);
  }
  return (
    <div className="Retro">
      <div>
        <button onClick={startInstructions}>Follow instructions</button>
        <br />
        <br />
        <button onClick={startRetro}>Play Retro</button>
        {instructions ? (
          <div>
            <CheckboxList />
          </div>
        ) : null}
      </div>
      {retroActive ? (
        <div>
          <div className="text-center">
            <div
              className={
                addClass === 1 ? "col" : addClass === 2 ? "col" : "row"
              }
            >
              <div className={addClass === 1 ? "row" : "col"}>
                <div className={(addClass === 1 ? " Rotate-1" : "").toString()}>
                  <h4>Millestones</h4>
                  <Timer timeInSeconds={600} />
                  <button
                    type="button"
                    className="addButton"
                    onClick={() => createCard("Millestones", "")}
                  >
                    +
                  </button>
                </div>
                {Cards.map((card, idx) => {
                  if (card.type === "Millestones") {
                    return (
                      <div>
                        <Card
                          key={"Millestones" + idx}
                          idx={idx}
                          cardId={card.id}
                          value={card.input}
                          userInput={newUserInput}
                          validateInput={validateInput}
                          MoveLeft={moveLeft}
                          Delete={deleteFn}
                          MoveRight={moveRight}
                          likesCount={card.likes}
                          dislikesCount={card.dislikes}
                          handleLikes={handleLikes}
                          handleDislikes={handleDislikes}
                          addClass={addClass}
                          color={"millestones"}
                        />
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
              <div className={addClass === 1 ? "row" : "col"}>
                <div className={(addClass === 1 ? " Rotate-1" : "").toString()}>
                  <h4>Went Well</h4>
                  <button
                    type="button"
                    className="addButton"
                    onClick={() => createCard("Went Well", "")}
                  >
                    +
                  </button>
                </div>
                {Cards.map((card, idx) => {
                  if (card.type === "Went Well") {
                    return (
                      <Card
                        key={"Went Well" + idx}
                        idx={idx}
                        cardId={card.id}
                        value={card.input}
                        userInput={newUserInput}
                        validateInput={validateInput}
                        MoveLeft={moveLeft}
                        Delete={deleteFn}
                        MoveRight={moveRight}
                        likesCount={card.likes}
                        dislikesCount={card.dislikes}
                        handleLikes={handleLikes}
                        handleDislikes={handleDislikes}
                        addClass={addClass}
                        color={"wentWell"}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
              <div className={addClass === 1 ? "row" : "col"}>
                <div className={(addClass === 1 ? " Rotate-1" : "").toString()}>
                  <h4>To Improve</h4>
                  <button
                    type="button"
                    className="addButton"
                    onClick={() => createCard("To Improve", "")}
                  >
                    +
                  </button>
                </div>
                {Cards.map((card, idx) => {
                  if (card.type === "To Improve") {
                    return (
                      <Card
                        key={"To Improve" + idx}
                        idx={idx}
                        cardId={card.id}
                        value={card.input}
                        userInput={newUserInput}
                        validateInput={validateInput}
                        MoveLeft={moveLeft}
                        Delete={deleteFn}
                        MoveRight={moveRight}
                        likesCount={card.likes}
                        dislikesCount={card.dislikes}
                        handleLikes={handleLikes}
                        handleDislikes={handleDislikes}
                        addClass={addClass}
                        color={"toImprove"}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
              <div className={addClass === 1 ? "row" : "col"}>
                <div className={(addClass === 1 ? " Rotate-1" : "").toString()}>
                  <h4>Action Items</h4>
                  <button
                    type="button"
                    className="addButton"
                    onClick={() => createCard("Action Items", "")}
                  >
                    +
                  </button>
                </div>
                {Cards.map((card, idx) => {
                  if (card.type === "Action Items") {
                    return (
                      <Card
                        key={"Action Items" + idx}
                        idx={idx}
                        cardId={card.id}
                        value={card.input}
                        userInput={newUserInput}
                        validateInput={validateInput}
                        MoveLeft={moveLeft}
                        Delete={deleteFn}
                        MoveRight={moveRight}
                        likesCount={card.likes}
                        dislikesCount={card.dislikes}
                        handleLikes={handleLikes}
                        handleDislikes={handleDislikes}
                        addClass={addClass}
                        color={"actionItems"}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
          <div className="btn-cntr">
            <button onClick={toggle} className="ChangeLayout">
              <i className="fas fa-bars" />
            </button>
          </div>
          <br />
        </div>
      ) : null}
    </div>
  );
}

export default FourLsRetro;
