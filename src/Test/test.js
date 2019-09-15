import db from '../DAL/postgres'
let ob = {
    statement:'MATCH (person:Person) RETURN person.name AS name',
    parameters:{nameParam: 'James'}
}
let test = new db()
async function  testF()  {
    console.log("rows")
    // note: we don't try/catch this because if connecting throws an exception
    // we don't need to dispose of the client (it will be undefined)
    let client = await test.open()
    try {
      await client.query('BEGIN')
      const queryText = 'INSERT INTO users(name) VALUES($1)'
      const { rows } = await client.query(queryText, ['brianc'])
      console.log(rows)
    //   const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
    //   const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
    //   await client.query(insertPhotoText, insertPhotoValues)
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    }
  }

testF()
// test.Close()
// async function testF(){
//     console.log((await test.readTx(ob.statement)).records[0])
//     await test.beginTransaction()
//     let result = await test.runTransaction("MERGE (bob1:Person {name : {nameParam} }) RETURN bob1.name AS name", {nameParam: 'Bob2234'})
//     result = await test.runTransaction("MERGE (adam1:Person {name : {nameParam} }) RETURN adam1.name AS name", {nameParam: 'Ada234m2'})
//     console.log(result)
//     await test.rollback()
// }
// testF()
// console.log("done") 