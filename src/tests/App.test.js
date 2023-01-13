import React from 'react';
import { getByRole, render, screen } from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';
import userEvent from '@testing-library/user-event';

const dataTestInputName = 'name-filter';
const dataTestInputColumn = 'column-filter';
const dataTestInputCompare = 'comparison-filter';
const dataTestInputValue = 'value-filter';
const dataTestInputFilter = 'button-filter';

const addFilters = (col, com, val) => {
  userEvent.selectOptions(screen.getByTestId(dataTestInputColumn), [col]);
  userEvent.selectOptions(screen.getByTestId(dataTestInputCompare), [com]);
  userEvent.type(screen.getByTestId(dataTestInputValue), val);
}

describe('Testes do App', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  })

  test('Verifica se quando renderizado o app, os inputs corretos estão na tela', () => {
    render(<App />);
    expect(screen.getByTestId(dataTestInputName)).toBeInTheDocument();
    const columnInput = screen.getByTestId(dataTestInputColumn)
    const comparisonInput = screen.getByTestId(dataTestInputCompare)
    const valueInput = screen.getByTestId(dataTestInputValue)
    expect(columnInput).toHaveValue('population');
    expect(comparisonInput).toHaveValue('maior que');
    expect(valueInput).toHaveValue(0);
    expect(screen.getAllByRole('row')).toHaveLength(1);

  });

  test('Verifica se a api é chamada e se retorna 10 planetas', async () => {
    render(<App />);
    await screen.findByRole('cell', { name: /tatooine/i });
    expect(fetch).toBeCalled();
    expect(screen.getAllByRole('row')).toHaveLength(11);
  })

  test('Verifica se é possivel adicionar um filtro', async () => {
    render(<App />);
    await screen.findByRole('cell', { name: /tatooine/i });
    addFilters('surface_water', 'menor que', '40');
    userEvent.click(screen.getByTestId(dataTestInputFilter));
    expect(screen.getAllByRole('row')).toHaveLength(7);
  })

  test('Verifica se é possivel multiplos filtros', async () => {
    render(<App />);
    await screen.findByRole('cell', { name: /tatooine/i });
    addFilters('surface_water', 'menor que', '40');
    userEvent.click(screen.getByTestId(dataTestInputFilter));

    addFilters('diameter', 'maior que', '11000');
    userEvent.click(screen.getByTestId(dataTestInputFilter));
    expect(screen.getAllByRole('row')).toHaveLength(3);

    addFilters('population', 'igual a', '6000000');

    userEvent.click(screen.getByTestId(dataTestInputFilter));
    expect(screen.getAllByRole('row')).toHaveLength(2);
  })
  test('Verifica se é possivel filtrar por nome', async () => {
    render(<App />);
    await screen.findByRole('cell', { name: /tatooine/i });
    userEvent.type(screen.getByTestId((dataTestInputName)), 'e');
    expect(screen.getAllByRole('row')).toHaveLength(5);

    userEvent.clear(screen.getByTestId((dataTestInputName)));

    userEvent.type(screen.getByTestId((dataTestInputName)), 'aa');
    expect(screen.getAllByRole('row')).toHaveLength(2);
  });
  test('Verifica se é possivel remover filtros', async () => {
    render(<App />);
    await screen.findByRole('cell', { name: /tatooine/i });
    addFilters('surface_water', 'menor que', '40');
    userEvent.click(screen.getByTestId(dataTestInputFilter));
    userEvent.click(screen.getByRole('button', { name: 'X' }));
    expect(screen.getAllByRole('row')).toHaveLength(11);
  })
  test('Verifica se existe um botão de remover todos os filtros e se ele funciona', async () => {
    render(<App />);
    await screen.findByRole('cell', { name: /tatooine/i });
    addFilters('surface_water', 'menor que', '40');
    userEvent.click(screen.getByTestId(dataTestInputFilter));

    addFilters('diameter', 'maior que', '11000');
    userEvent.click(screen.getByTestId(dataTestInputFilter));

    const btnRemoveAllFilters = screen.getByTestId('button-remove-filters');
    userEvent.click(btnRemoveAllFilters);
    expect(screen.getAllByRole('row')).toHaveLength(11);
  })
});

