import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Context } from '../../App';
import Todo from '.';

test('render a header element as expected', () => {
    const contextValue = {
        incomplete: 0,
        defaultValues: {
            difficulty:3
        }
    };

  render(
    <Context.Provider value = {contextValue}>
        <Todo />
    </Context.Provider>
  );

  const header = screen.getByTestId('todo-header');
  const title = screen.getByTestId('todo-h1');

  expect(header).toBeInTheDocument();
  expect(title).toBeInTheDocument();
});
