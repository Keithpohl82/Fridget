import React, { useState } from "react";

const AddStep = ({ onAddStep }) => {
  const [step, setStep] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step.trim()) {
      onAddStep(step.trim());
      setStep("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={step}
          onChange={(e) => setStep(e.target.value)}
          placeholder="Add a step"
        />
        <button type="submit">Add Step</button>
      </form>
    </div>
  );
};

export default AddStep;
