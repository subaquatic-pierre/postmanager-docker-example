import React from "react";
import axios from "axios";

const CoolComponent = () => {
  const [response, setResponse] = React.useState("");

  const getData = async () => {
    const res = await axios.get("/api");

    console.log(res);
  };

  React.useEffect(() => {
    getData();
  }, []);
  return <div>Life</div>;
};

export default CoolComponent;
