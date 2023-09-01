import { renderHook } from "@testing-library/react";
import { useEffect, useState } from "react";

describe('Hooks', () => {
  it('', () => {
    const { result } = renderHook(() => {
      const [nome, setNome] = useState('Joana');
      useEffect(() => {
        setNome('João');
      }, []);

      return nome;
    });

    expect(result.current).toBe('João');
  });
});