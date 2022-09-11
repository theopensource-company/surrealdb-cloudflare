# surrealdb-cloudflare
SurrealDB on the edge!

## Cloudflare workers
This module has been build specifically to be compatible with cloudflare workers. Tested with wrangler2, though should probably work fine with wrangler1 aswell.

## Basic interpetation
It's just a basic interpetation of the SurrealDB HTTP/REST API, You can check them here: https://surrealdb.com/docs/integration/http

## Get started
You can check out the demo.ts file or check the examples down below:

-----
### Connection variables from environment
```typescript
import Surreal from 'surrealdb-cloudflare';

// Type safety, typescript example :D
type Env = {
    HOST: string;
    USER: string;
    PASS: string;
    NAMESPACE: string;
    DATABASE: string;
}

// We can update the connection variables later on, as we don't have them available here just yet...
const db = new Surreal();

export default {
	async fetch(
		request: Request,
        env: Env
	): Promise<Response> {
        // If database not yet connected, let's update the connection details.
        if (!db.connected()) db.connect({
            host: env.HOST ?? '',
            username: env.USER ?? '',
            password: env.PASS ?? '',
            namespace: env.NAMESPACE ?? '',
            database: env.DATABASE ?? ''
        });

        // Example query: Retrieves all records from table 'table'.
        let res = await db.getRecords('table');
		console.log(res[0].result);

		return new Response("Hello World!");
	},
};
```

-----
### Connection variables defined in code
```typescript
import Surreal from 'surrealdb-cloudflare';

// We can update the connection variables later on, as we don't have them available here just yet...
const db = new Surreal({
    host: 'http://surreal.domain.com',
    username: 'root',
    password: 'password',
    namespace: 'awesome',
    database: 'example'
});

export default {
	async fetch(
		request: Request
	): Promise<Response> {
        // Example query: Retrieves all records from table 'table'.
        let res = await db.getRecords('table');
		console.log(res[0].result);

		return new Response("Hello World!");
	},
};
```

## Strong type result

```typescript
const res = await db.getRecords<{
    id: string;
    username: string;
    status: "verified" | "unverified";
}>('user');

res.forEach(record => {
    // Everything in "result" is now strong typed with the defined type.
    const { result } = record;
    console.log(`${result.id} - User ${result.username} is ${result.status}`);
});
```

## Exported types and classes

- `type SurrealConfig`
- `type SurrealResponse`
- `(default) class Surreal`

## Available functions in Surreal class

- `Surreal.connect(config: SurrealConfig)`: Update connection details to Surreal database.
- `Surreal.connected(): boolean`: Check if connection details are successfully specified.

### All functions in the following section return the following:
```typescript
    [
        {
            time: string;
            status: string;
            result: TResponse;
        },
        ....
    ]
```
- `async Surreal.query(query: string)`: Run a query on the specified database.
- `async Surreal.getRecords(table: string)`: Get all records from table.
- `async Surreal.createRecord(table: string, data: object)`: Create a record with random ID.
- `async Surreal.deleteRecords(table: string)`: Delete all records from table.
- `async Surreal.getRecordWithId(table: string, id: string)`: Get record from table with ID.
- `async Surreal.createRecordWithId(table: string, id: string, data: object)`: Create record in table with ID.
- `async Surreal.setRecordWithId(table: string, id: string, data: object)`: Overwrite record in table with ID.
- `async Surreal.updateRecordWithId(table: string, id: string, data: object)`: Update record in table with ID.
- `async Surreal.deleteRecordWithId(table: string, id: string)`: Delete record from table with ID.