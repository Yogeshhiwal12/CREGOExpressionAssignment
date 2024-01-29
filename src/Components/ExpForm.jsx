import React, { useState } from "react";
import { Form, Button, Row, Col, Dropdown } from "react-bootstrap";

const ExpressionForm = ({ onSubmit }) => {
  const [expressions, setExpressions] = useState([
    { ruleType: "", operator: "", value: "", score: "" },
  ]);
  const [connector, setConnector] = useState("AND");

  const handleAddExpression = () => {
    const isValid = expressions.every(
      ({ ruleType, operator, value, score }) => {
        return (
          ruleType.trim() !== "" &&
          operator.trim() !== "" &&
          value.trim() !== "" &&
          score.trim() !== "" &&
          /^\d*$/.test(value) &&
          /^\d*$/.test(score)
        );
      }
    );

    if (isValid) {
      setExpressions([
        ...expressions,
        { ruleType: "", operator: "", value: "", score: "" },
      ]);
    } else {
      alert("Please fill in all fields.");
    }
  };
  const handleDeleteExpression = (index) => {
    const updatedExpressions = [...expressions];
    updatedExpressions.splice(index, 1);
    setExpressions(updatedExpressions);
  };

  const handleInputChange = (index, field, value) => {
    // Check if the entered value is a digit for "Value" and "Score" fields using regular expression
    if (field === "value" || field === "score") {
      if (/^\d*$/.test(value)) {
        const updatedExpressions = [...expressions];
        updatedExpressions[index][field] = value;
        setExpressions(updatedExpressions);
      }
    } else {
      const updatedExpressions = [...expressions];
      updatedExpressions[index][field] = value;
      setExpressions(updatedExpressions);
    }
  };

  const handleSubmit = () => {
    alert("Open Console To Check Output");
    const rules = expressions.map(({ ruleType, operator, value, score }) => ({
      key: ruleType.toLowerCase().replace(/\s/g, "_"),
      output: { value, operator, score: parseInt(score) },
    }));

    const output = {
      rules,
      combinator: connector,
    };

    onSubmit(output);
  };

  return (
    <Form>
      <Form.Group controlId="connectorType">
        <Form.Label>Connector Type</Form.Label>
        <Dropdown onSelect={(eventKey) => setConnector(eventKey)}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {connector}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="AND">AND</Dropdown.Item>
            <Dropdown.Item eventKey="OR">OR</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      {expressions.map((expression, index) => (
        <Row key={index} style={{ marginBottom: "5px" }}>
          <Col>
            <Form.Control
              as="select"
              value={expression.ruleType}
              onChange={(e) =>
                handleInputChange(index, "ruleType", e.target.value)
              }
            >
              <option value="">Select Rule Type</option>
              <option value="Age">Age</option>
              <option value="Credit Score">Credit Score</option>
              <option value="Account Balance">Account Balance</option>
            </Form.Control>
          </Col>
          <Col>
            <Form.Control
              as="select"
              value={expression.operator}
              onChange={(e) =>
                handleInputChange(index, "operator", e.target.value)
              }
            >
              <option value="">Select Operator</option>
              <option value=">">{">"}</option>
              <option value="<">{"<"}</option>
              <option value=">=">{">="}</option>
              <option value="<=">{"<="}</option>
              <option value="=">{"="}</option>
            </Form.Control>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Value"
              value={expression.value}
              onChange={(e) =>
                handleInputChange(index, "value", e.target.value)
              }
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Score"
              value={expression.score}
              onChange={(e) =>
                handleInputChange(index, "score", e.target.value)
              }
            />
          </Col>
          <Col>
            <Button
              variant="danger"
              onClick={() => handleDeleteExpression(index)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      ))}
      <Button variant="primary" onClick={handleAddExpression}>
        Add Expression
      </Button>
      <Button
        variant="success"
        style={{ margin: "5px" }}
        onClick={handleSubmit}
      >
        Check Output
      </Button>
    </Form>
  );
};

export default ExpressionForm;
