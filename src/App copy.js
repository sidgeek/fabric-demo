import React, { useEffect } from "react";
import { useInstance } from "@backium/use-instance";
import MySelect from "./components/MySelect";
import Canvas from "./components/Canvas";

export class SecretManager {
  get() {
    return "supersecret";
  }
}

export default function App() {
  const { setInstance } = useInstance();
  const secretManager = new SecretManager();
  useEffect(() => {
    setInstance("secretManager", secretManager);
  }, []);

  const handleSelect = () => {
    console.log(">>>> s");
  };
  const canvasSize = [{ width: 100, height: 100, index: 1 }];

  return (
    <div className="App">
      <Canvas />
      <MySelect canvasSize={canvasSize} onSelect={handleSelect} />
    </div>
  );
}
