export interface Plano {
  id  ?:number,
  ativo :boolean,
  tipo :string,
  mensalidade :number,
  criado_em ?:Date,
  atualizado_em ?:Date,
}
