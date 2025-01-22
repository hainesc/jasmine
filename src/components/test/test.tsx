import { Button } from "@mui/material";
import React from "react";

function Test() {
  const [clicked, setClicked] = React.useState(false);

  return React.useMemo(() => {
    console.log(clicked);
    return clicked ? (
      <h1>clicked</h1>
    ) : (
      <Button
        onClick={() => {
          setClicked(true);
        }}
      >
        Click it
      </Button>
    );
  }, [clicked]);
}

export default Test;
