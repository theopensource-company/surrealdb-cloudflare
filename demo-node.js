(async () => {
  const {fetch} = await import('node-fetch');
  const {Surreal} = await import('./dist/index.js');
  const dotenv = await import('dotenv');

  dotenv.config({
      path: '.dev.vars',
      override: true
  });

  const db = new Surreal({
      host: process.env.HOST ?? '',
      username: process.env.USER ?? '',
      password: process.env.PASS ?? '',
      namespace: process.env.NAMESPACE ?? '',
      database: process.env.DATABASE ?? ''
  }, fetch);

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
})();