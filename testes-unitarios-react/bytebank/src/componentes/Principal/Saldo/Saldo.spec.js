import { render, screen } from "@testing-library/react";
import Saldo from ".";

describe("Componente Saldo", () => {
  it("Deve renderizar o valor do saldo", () => {
    const MOCK_SALDO = 'R$ 1000';
    render(<Saldo saldo={1000} />);

    const saldo = screen.getByTestId("saldo");

    expect(saldo).toHaveTextContent(MOCK_SALDO);
  });
});