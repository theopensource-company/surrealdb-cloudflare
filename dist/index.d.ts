export declare type SurrealConfig = {
    host: string;
    username: string;
    password: string;
    namespace: string;
    database: string;
};
export declare type SurrealResponse<TResponse = any> = Array<{
    time: string;
    status: string;
    result: TResponse;
}>;
export declare class Surreal {
    private host?;
    private username?;
    private password?;
    private namespace?;
    private database?;
    constructor(config?: SurrealConfig);
    connect(config: SurrealConfig): void;
    connected(): boolean;
    query<TResponse = any>(query: string): Promise<SurrealResponse<TResponse>>;
    getRecords<TResponse = any>(table: string): Promise<SurrealResponse<TResponse>>;
    createRecord<TResponse = any>(table: string, data: Object): Promise<SurrealResponse<TResponse>>;
    deleteRecords<TResponse = any>(table: string): Promise<SurrealResponse<TResponse>>;
    getRecordWithId<TResponse = any>(table: string, id: string | number): Promise<SurrealResponse<TResponse>>;
    createRecordWithId<TResponse = any>(table: string, id: string | number, data: Object): Promise<SurrealResponse<TResponse>>;
    setRecordWithId<TResponse = any>(table: string, id: string | number, data: Object): Promise<SurrealResponse<TResponse>>;
    updateRecordWithId<TResponse = any>(table: string, id: string | number, data: Object): Promise<SurrealResponse<TResponse>>;
    deleteRecordWithId<TResponse = any>(table: string, id: string | number): Promise<SurrealResponse<TResponse>>;
    private request;
}
export default Surreal;
