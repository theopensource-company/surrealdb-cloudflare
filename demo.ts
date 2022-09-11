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

        await db.createRecordWithId('user', 'micha', {
            firstname: "Micha",
            lastname: "de Vries",
            email: "micha@theopensource.company"
        });

        await db.updateRecordWithId('user', 'micha', {
            username: "kearfy"
        })

        let res = db.getRecords('user');

		console.log((await res)[0].result);
		return new Response("Hello World!");
	},
};