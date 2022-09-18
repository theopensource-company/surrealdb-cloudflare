import Surreal from './src';
const db = new Surreal();

type Env = {
    HOST: string;
    USER: string;
    PASS: string;
    NAMESPACE: string;
    DATABASE: string;
}

export default {
	async fetch(
		request: Request,
        env: Env
	): Promise<Response> {
        if (!db.connected()) db.connect({
            host: env.HOST ?? '',
            username: env.USER ?? '',
            password: env.PASS ?? '',
            namespace: env.NAMESPACE ?? '',
            database: env.DATABASE ?? ''
        });

        console.log("Create record: ", (await db.createRecordWithId('user', 'johndoe', {
            firstname: "John",
            lastname: "Doe",
            email: "john@example.email"
        }))[0].result);
    
        console.log("Update record: ", (await db.updateRecordWithId('user', 'johndoe', {
            username: "johndoe"
        }))[0].result)
    
        console.log("Retrieve record: ", (await db.getRecords('user'))[0].result)
        console.log("Delete record: ", (await db.deleteRecordWithId('user', 'johndoe'))[0].result)
		return new Response("Hello World!");
	},
};