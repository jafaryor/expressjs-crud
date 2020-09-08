import jsonfile from 'jsonfile';

/**
 * The service which mimics a database.
 * It reads json data from file and writes json data into file.
 */
export class MockDaoMock {
    private readonly dbFilePath = 'src/daos/MockDb/MockDb.json';

    protected openDb(): Promise<any> {
        return jsonfile.readFile(this.dbFilePath);
    }

    protected saveDb(db: any): Promise<any> {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}
