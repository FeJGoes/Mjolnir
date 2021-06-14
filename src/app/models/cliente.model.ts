import { Plano } from "./plano.model";

export interface Cliente {
  id  ?:number,
  ativo :boolean,
  nome :string,
  senha :string,
  email :string,
  telefone :string,
  estado :string,
  cidade ?:string,
  data_nascimento ?:Date,
  avatar ?:string,
  criado_em ?:Date,
  atualizado_em ?:Date,
  planos  ?:Plano[],
}
