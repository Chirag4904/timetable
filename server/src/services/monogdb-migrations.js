// https://github.com/tj/node-migrate/blob/main/examples/custom-state-storage/mongo-state-storage.js
const { MONGO_URL } = require("./mongo");
const migrate = require("migrate");
const { MongoClient } = require("mongodb");

const collectionName = "migrationsLog";
class MongoDbStore {
    async load(fn) {
        let client = null;
        let data = null;
        try {
            client = await MongoClient.connect(MONGO_URL);
            const db = client.db();
            data = await db.collection(collectionName).find().toArray();
            if (data.length !== 1) {
                console.log(
                    "Cannot read migrations from database. If this is the first time you run migrations, then this is normal."
                );
                return fn(null, {});
            }
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            client.close();
        }
        return fn(null, data[0]);
    }

    async save(set, fn) {
        let client = null;
        let result = null;
        try {
            client = await MongoClient.connect(MONGO_URL);
            const db = client.db();
            result = await db.collection(collectionName).update(
                {},
                {
                    $set: {
                        lastRun: set.lastRun,
                    },
                    $push: {
                        migrations: { $each: set.migrations },
                    },
                },
                { upsert: true }
            );
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            client.close();
        }

        return fn(null, result);
    }
}

function runMigrations() {
    console.info("Running migrations...");
    migrate.load(
        {
            stateStore: new MongoDbStore(),
        },
        function (err, set) {
            if (err) {
                throw err;
            }

            set.up((err2) => {
                if (err2) {
                    throw err2;
                }
                console.log("Migrations successfully ran");
            });
        }
    );
}

module.exports = {
    MongoDbStore,
    runMigrations,
};
