import React from "react";
import { useInstance } from "@backium/use-instance";

export const useSecret = () => {
  const [secret, setSecret] = React.useState("");
  const { instances, getInstance } = useInstance();
  React.useEffect(() => {
    const instance = getInstance("secretManager");
    const secretText = instance?.get();
    if (secretText) {
      setSecret(secretText);
    }
  }, [instances]);

  return secret;
};
