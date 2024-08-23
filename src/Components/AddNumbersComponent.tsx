import React, { useState } from "react";
import add from "./AddFunction.tsx"; // Ensure the add function is imported
import styles from "./AddNumbersComponent.module.css";

function AddNumbersComponent() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCalculate = () => {
    try {
      const sum = add(input);
      setResult(sum);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
      setResult(null); // Clear any previous result
    }
  };

  const errorStyles = {
    color: "red",
    textAlign: "center" as const,
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Incubyte String Calculator</h1>
      <div className={styles.field}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter numbers"
        />
        <button onClick={handleCalculate}>Calculate Sum</button>
      </div>
      {result !== null && <div className={styles.result}>Result: {result}</div>}
      {error && (
        <div className={styles.result} style={errorStyles}>
          {error}
        </div>
      )}
    </div>
  );
}

export default AddNumbersComponent;
