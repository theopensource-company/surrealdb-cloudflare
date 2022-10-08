export declare type SurrealConfig = {
    host: string;
    username: string;
    password: string;
    namespace: string;
    database: string;
};
export declare type SurrealQueryOK<TResult = any> = {
    time: string;
    status: "OK";
    result: TResult;
};
export declare type SurrealQueryERR = {
    time: string;
    status: "ERR";
    detail: string;
};
export declare type SurrealQueryResult<TResult = any> = SurrealQueryOK<TResult> | SurrealQueryERR;
export declare type SurrealResponse<TResult = any> = Array<SurrealQueryResult<TResult>>;
export declare class Surreal<TFetcher = typeof fetch> {
    private host?;
    private username?;
    private password?;
    private namespace?;
    private database?;
    private fetcher?;
    constructor(config?: SurrealConfig, fetcher?: TFetcher);
    connect(config: SurrealConfig): void;
    connected(): boolean;
    query<TResult = any>(query: string): Promise<SurrealResponse<TResult>>;
    getRecords<TResult = any>(table: string): Promise<SurrealResponse<TResult>>;
    createRecord<TResult = any>(table: string, data: Object): Promise<SurrealResponse<TResult>>;
    deleteRecords<TResult = any>(table: string): Promise<SurrealResponse<TResult>>;
    getRecordWithId<TResult = any>(table: string, id: string | number): Promise<SurrealResponse<TResult>>;
    createRecordWithId<TResult = any>(table: string, id: string | number, data: Object): Promise<SurrealResponse<TResult>>;
    setRecordWithId<TResult = any>(table: string, id: string | number, data: Object): Promise<SurrealResponse<TResult>>;
    updateRecordWithId<TResult = any>(table: string, id: string | number, data: Object): Promise<SurrealResponse<TResult>>;
    deleteRecordWithId<TResult = any>(table: string, id: string | number): Promise<SurrealResponse<TResult>>;
    private request;
}
export default Surreal;
