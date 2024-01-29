// App.js
import React from 'react';
import { Container } from 'react-bootstrap';
import ExpressionForm from './Components/ExpForm';


function App() {
  const handleSubmit = (output) => {
    console.log(JSON.stringify(output, null, 2));
    // Handle the output as needed (e.g., send it to the server)
  };

  return (
    <Container className="mt-5">
      <h1>Expression Engine UI</h1>
      <ExpressionForm onSubmit={handleSubmit} />
    </Container>
  );
}

export default App;
