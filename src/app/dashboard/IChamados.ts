export interface ICalled {
    id: number,
    titulo: string,
    descricao: string,
    status: string,
    autor: string,
    responsavel: string,
    data_execucao: Date,
    data_finalizado: Date,
    solucao: string,
    data_abertura: string,
    createdAt: Date,
    updatedAt: Date
}

export interface IAmoutCalled {
    pendente: number;
    execucao: number;
    finalizado: number;
}