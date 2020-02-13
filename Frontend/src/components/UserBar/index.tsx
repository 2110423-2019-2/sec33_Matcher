import React from "react";
import "./index.css";

interface UserProps {
    Username: string
}

export default ({Username}: UserProps) => {

  return (
      <p>{Username}</p>
  );
};

