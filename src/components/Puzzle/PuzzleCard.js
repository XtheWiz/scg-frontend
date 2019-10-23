import React from 'react';

const puzzleCard = (props) => {

  return (
    <div className="card mb-2 bg-light mx-auto" style={{maxWidth: '25rem'}}>
      <div className="card-body">
        <h5 className="card-title">{props.seq}</h5>
        <p className={"card-text" + (props.isSequence === "y" ? "" : " text-danger")}>
          {props.message}
        </p>
      </div>
    </div>
  );
}

export default puzzleCard;