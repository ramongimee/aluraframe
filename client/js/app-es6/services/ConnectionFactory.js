    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'aluraframe';
    let connection = null;
    let close = null;

export class ConnectionFactory {


    constructor() {
        throw new Error('Não é possivel criar uma instâncias de ConnectionFactory')
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {

                ConnectionFactory._createStores(e.target.result);

            };

            openRequest.onsuccess = e => {

                if (!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function () {
                        throw new Error('Você não pode fechar diretamente a conexão');//Monkey Patch
                    }
                }
                resolve(connection);

            };

            openRequest.onerror = e => {

                console.log(e.target.Error);

                reject(e.target.error.name);

            };

        });
    }
    static _createStores(connection) {
        stores.forEach(store => {
            if (connection.result.objectStoreNames.contains(store)) connection.result.deleteObjectStore(store);
            
            connection.result.createObjectStore(store, { autoIncrement: true });
        });
    }
    static closeConnection() {
        if (connection) {
            close();
            connection = null;
        }
    }
}