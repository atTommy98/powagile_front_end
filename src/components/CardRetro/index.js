import React from "react";

function Card(props) {
  return (
    <div className={"BoardItem card " + props.color}>
      <br />
      <textarea
        className="flexform"
        placeholder="Enter Text Here"
        value={props.value}
        onChange={(e) => props.userInput(e, props.idx)}
        onBlur={props.validateInput}
      />
      <br />
      <div className="FunctionNav">
        <button
          onClick={() => {
            props.MoveLeft(props.cardId, props.idx);
          }}
        >
          {" "}
          <i className="fas fa-caret-left left" title="Move card to the left" />
        </button>
        <button onClick={() => props.handleDislikes(props.idx)}>
          {" "}
          <i className="far fa-thumbs-down" title="Dislikes" />
          {props.dislikesCount}
        </button>
        <button onClick={() => props.Delete(props.cardId)}>
          {" "}
          <i className="far fa-trash-alt" title="Delete card" />
        </button>
        <button onClick={() => props.handleLikes(props.idx)}>
          {" "}
          <i className="far fa-far fa-thumbs-up" title="Likes" />
          {props.likesCount}
        </button>
        <button
          onClick={() => {
            props.MoveRight(props.cardId, props.idx);
          }}
        >
          {" "}
          <i
            className="fas fa-caret-right right"
            title="Move card to the right"
          />
        </button>
      </div>
    </div>
  );
}

export default Card;
