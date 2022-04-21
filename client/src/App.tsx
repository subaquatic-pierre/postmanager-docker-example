import React from "react";

import axios from "axios";

const CoolComponent: React.FC = () => {
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

function App() {
  return (
    <div>
      <CoolComponent />
    </div>
  );
}

export default App;
