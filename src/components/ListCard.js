import React from "react";
import "../styles.css";

const ListCard = ({ title, items }) => (
  <div className="card">
    <h3>{title}</h3>
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <strong>Name:</strong> {item.name} <br />
          <strong>Username:</strong> {item.username} <br />
          <strong>Sex:</strong> {item.sex} <br />
          <strong>Address:</strong> {item.address} <br />
          <strong>Email:</strong> {item.email} <br />
          <strong>Birthday:</strong> {item.birthday} <br />
        </li>
      ))}
    </ul>
  </div>
);

export default ListCard;
