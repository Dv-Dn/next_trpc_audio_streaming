import { ChangeEvent, useState } from "react";

const useInput = (initialValue: string = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === "string") setValue(e);
    else setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
};

export { useInput };
