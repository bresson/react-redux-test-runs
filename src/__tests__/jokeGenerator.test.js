import React from 'react'
import { render, Simulate, fireEvent  } from 'react-testing-library'
// import {
//     getByLabelText,
//     getByText,
//     getByTestId,
//     queryByTestId,
//     // Tip: all queries are also exposed on an object
//     // called "queries" which you could import here as well
//     wait,
//   } from 'dom-testing-library'
import * as axios from 'axios'
import MockAxios from "axios-mock-adapter";
import "dom-testing-library/extend-expect";

import Joke from '../Joke'
import JokeGenerator from '../containers/JokeGenerator'

const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });
// Needed only when writing tests in CodeSandox
afterAll(() => mock.restore());

test('Joke component receives props and then renders text', () => {
    const { getByTestId } = render(
        <Joke text='The funniest joke this year.' />
    );

    expect(getByTestId('joke-text')).toHaveTextContent('The funniest joke this year')
})

test("'JokeGenerator' component fetches a random joke and renders it", async () => {

    mock.onGet().replyOnce(200, {
        value: {
          joke: "Really funny joke!"
        }
      });


      const { getByText, queryByText, queryByTestId } = render(<JokeGenerator />);

      /* Checking if a default text is being displayed when
       * no joke has been loaded yet. 
       */
      expect(getByText("You haven't loaded any joke yet!")).toBeInTheDOM();
    
      // Simulating a button click in the browser
      Simulate.click(getByText("Load a random joke"));
    
      // Checking if the default text is no longer displayed.
      expect(queryByText("You haven't loaded any joke yet!")).not.toBeInTheDOM();
    
      // Checking if 'Loading...' is visible in the DOM.
      expect(queryByText("Loading...")).toBeInTheDOM();
    
      /*  'wait' method waits (4500ms by default) until a callback
       *  function stops throwing an error. It is being checked
       *  at 50ms intervals.
       *  
       *  Waiting until Loading message disappear from DOM
       */
      await wait(() => expect(queryByText("Loading...")).not.toBeInTheDOM());
    
      // Checking if joke is being displayed.
      expect(queryByTestId("joke-text")).toBeInTheDOM();
} )