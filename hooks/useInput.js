import {useState} from "react";

function useInput(params) {
  const [inputs, setInputs] = useState(params);

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  return [inputs, handleChange];
}

export default useInput;
