const dbConnection_dev = {
    neo4j:{
        connection:"bolt://localhost",
        username:"neo4j",
        password:"neo4j"
    },
    postgres:{
        user: 'postgres',
        host: 'localhost',
        database: 'test',
        password: 'password',
        port: 54320,
    }
};
const dbConnection_docker = {
    neo4j:{
        connection:"bolt://neo4j",
        username:"neo4j",
        password:"neo4j"
    },
    postgres:{
        user: 'postgres',
        host: 'localhost',
        database: 'test',
        password: 'password',
        port: 54320,
    }
};
export default process.env.DOCKER === "true" ?dbConnection_docker:dbConnection_dev