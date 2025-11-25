import React from "react";
import { Calender } from "./Calender";
import { useEffect, useState } from "react";
import axios from "axios";
import { BabyActionCreate } from "./BabyActionCreate";

export const DashBoard = () => {
  const [actions, setActions] = useState([]);

  const featchTasks = async () => {
    const API_URL = "http://localhost/api/dashbord";
    const res = await axios.get(API_URL);
    try {
      setActions(res.data.baby_actions);
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    featchTasks();
  }, []);

  return (
    <>
      <Calender actions={actions} fetch={featchTasks} />
      <BabyActionCreate fetch={featchTasks} />
    </>
  );
};
