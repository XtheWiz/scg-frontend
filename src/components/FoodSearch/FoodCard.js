import React from 'react';

const foodCard = (props) => {

  return (
    <div className="card mb-2 bg-light">
      <div className="row no-gutters">
        <div className="col-4 d-flex align-items-center bg-white">
          <img src={props.imgSrc} className="card-img" alt="..." />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text"><small className="text-muted">ระยะทาง {props.dist} กม.</small></p>
            <p className="card-text">{props.vicinity}</p>
            <p className="card-text"><small><a href={props.mapURL} target="_blank" >ดูเส้นทาง</a></small></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default foodCard;