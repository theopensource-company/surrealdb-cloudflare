export type SurrealConfig = {
    host: string;
    username: string;
    password: string;
    namespace: string;
    database: string;
};

export type SurrealResponse<TResponse = any> = Array<{
    time: string;
    status: string;
    result: TResponse;
}>;

class ConnectionError extends Error{};

const createAuthorization = (username: string, password: string) => {
    try {
      return `Basic ${btoa(`${username}:${password}`)}`;
    } catch (err) {
      return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
    }
};

export class Surreal<TFetcher = typeof fetch> {
    private host?: string;
    private username?: string;
    private password?: string;
    private namespace?: string;
    private database?: string;
    private fetcher?: TFetcher;

    constructor(config?: SurrealConfig, fetcher?: TFetcher) {
        if (config) this.connect(config);
        if (fetcher) this.fetcher = fetcher;
    }
    
    // Define connection variables

    connect(config: SurrealConfig) {
        this.host = config.host;
        this.username = config.username;
        this.password = config.password;
        this.namespace = config.namespace;
        this.database = config.database;
    }

    connected(): boolean {
        return !!(this.host && this.username && this.password && this.namespace && this.database);
    }

    // General query function

    async query<TResponse = any>(query: string) {
        return (await this.request<TResponse>('sql', {
            body: query
        }));
    }

    // Table functions affecting all records

    async getRecords<TResponse = any>(table: string) {
        return (await this.request<TResponse>(`key/${table}`, {
            method: "GET"
        }));
    }

    async createRecord<TResponse = any>(table: string, data: Object) {
        return (await this.request<TResponse>(`key/${table}`, {
            method: "POST",
            body: data
        }));
    }

    async deleteRecords<TResponse = any>(table: string) {
        return (await this.request<TResponse>(`key/${table}`, {
            method: "DELETE"
        }));
    }

    // Table functions affecting specific records

    async getRecordWithId<TResponse = any>(table: string, id: string | number) {
        return (await this.request<TResponse>(`key/${table}/${id}`, {
            method: "GET"
        }));
    }

    async createRecordWithId<TResponse = any>(table: string, id: string | number, data: Object) {
        return (await this.request<TResponse>(`key/${table}/${id}`, {
            method: "POST",
            body: data
        }));
    }

    async setRecordWithId<TResponse = any>(table: string, id: string | number, data: Object) {
        return (await this.request<TResponse>(`key/${table}/${id}`, {
            method: "PUT",
            body: data
        }));
    }

    async updateRecordWithId<TResponse = any>(table: string, id: string | number, data: Object) {
        return (await this.request<TResponse>(`key/${table}/${id}`, {
            method: "PATCH",
            body: data
        }));
    }

    async deleteRecordWithId<TResponse = any>(table: string, id: string | number) {
        return (await this.request<TResponse>(`key/${table}/${id}`, {
            method: "DELETE"
        }));
    }

    // Request function interfacing with surreal HTTP api

    private async request<TResponse = any>(path: string, options?: {
        host?: string;
        username?: string;
        password?: string;
        namespace?: string;
        database?: string;
        method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
        body?: Object | string;
    }): Promise<SurrealResponse<TResponse>> {
        if (!this.connected()) throw new ConnectionError("The Surreal instance has not yet been connected");
        return (await (this.fetcher ? this.fetcher as any : fetch)(`${options?.host ?? this.host!}/${path.startsWith('/') ? path.slice(1) : path}`, {
            method: options?.method ?? "POST",
            headers: {
                'Authorization': createAuthorization(options?.username ?? this.username!, options?.username ?? this.password!),
                'Content-Type': 'application/json',
                'NS': options?.namespace ?? this.namespace!,
                'DB': options?.database ?? this.database!
            },
            body: typeof options?.body == 'string' ? options?.body : JSON.stringify(options?.body)
        })).json();
    }
}

export default Surreal;