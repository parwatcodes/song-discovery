import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #121212;
    color: #ffffff;
  }

  #root {
    width: 90%;
    margin: 0 auto;
  }

  h1, h2, h3 {
    color: #ffffff;
  }

  button {
    background-color: #1DB954;
    border: none;
    padding: 0 20px;
    color: #fff;
    border-radius: 4px;
    height: 30px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }

  button:hover {
    background-color:rgb(54, 125, 79);
  }

  input, select {
    border-radius: 4px;
    border: 1px solid #333;
    margin-left: 5px;
    padding-left: 5px;
    height: 30px;
    min-width: 100px;
    outline: none;
  }

  #search {
    height: 50px;
    border-radius: 8px;
    padding-left: 20px;
    width: 50%;
  }

  #search::placeholder {
    color: #333;
    font-size: 1.2rem;
  }
`;
