import { createMockTask } from "@redux-saga/testing-utils";
import { call, cancel, take } from "redux-saga/effects";
import categoriasService from "services/categorias";
import { adicionarTodasAsCategorias } from "store/reducers/categorias";
import { categoriasSaga, observarCategorias } from "./categorias";

describe("Testando categorias saga", () => {
  describe("Workers", () => {
    it("Deve executar categoriasService.buscar", () => {
      const funcaoGeradora = observarCategorias();
      const funcaoEsperada = call(categoriasService.buscar);

      funcaoGeradora.next(); // delay
      const funcaoExecutada = funcaoGeradora.next();

      expect(funcaoExecutada.value).toEqual(funcaoEsperada);
    });
  });

  describe("Watchers", () => {
    it("Deve executar a tarefa corretamente", () => {
      const funcaoGeradora = categoriasSaga();
      funcaoGeradora.next();
      const funcaoEsperada = take(adicionarTodasAsCategorias);

      expect(funcaoGeradora.next().value).toEqual(funcaoEsperada);
    });

    it("Deve executar a tarefa apenas uma vez", () => {
      const funcaoGeradora = categoriasSaga();
      const mockTarefa = createMockTask();
      funcaoGeradora.next(mockTarefa);
      const funcaoCancelarEsperada = cancel(mockTarefa.cancel());
      funcaoGeradora.next();

      expect(funcaoGeradora.next().value).toEqual(funcaoCancelarEsperada);
    });
  });
});