import * as SQLite from 'expo-sqlite';
import { v4 as uuidv4 } from 'uuid';

const db = SQLite.openDatabase('little_lemon')

export async function createTable() {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS menu
                        (id INTEGER PRIMARY KEY AUTOINCREMENT,
                        uuid TEXT,
                        category TEXT,
                        description TEXT,
                        image TINYTEXT,
                        name TINYTEXT,
                        price TINYTEXT)`
                );
            },
            reject,
            resolve
        );
    });
};

export async function getMenuItems() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('select * from menu', [], (_, { rows }) => {
                resolve(rows._array);
            })
        })
    })
}

export function saveMenuItems(menuItems) {
    db.transaction((tx) => {

        menuItems.forEach((item) => {
            const uuid = uuidv4()
            tx.executeSql(`INSERT INTO menu (uuid, category, description, image, name, price)
                VALUES (?, ?, ?, ?, ?, ?)`, [uuid, item.category, item.description, item.image, item.name, item.price])
        }
        )
    })

}

export async function filterByQueryAndCategories(query, activeCategories) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
        // If both query and categories are empty, return all items
            if (!query && activeCategories.length === 0) {
            tx.executeSql('SELECT * FROM menu', [], (_, { rows }) => {
                resolve(rows._array);
            });
            } else {
            const params = [];

            // Base query
            let queryText = 'SELECT * FROM menu WHERE ';

            // Handle search query
            if (query) {
                queryText += 'name LIKE ?';
                params.push(`%${query}%`);
            }

            // Handle selected categories
            if (activeCategories.length > 0) {
                if (query) {
                queryText += ' AND ';
                }
                const categoryConditions = activeCategories.map(() => 'category = ?').join(' OR ');
                queryText += `(${categoryConditions})`;
                params.push(...activeCategories);
            }

            tx.executeSql(queryText, params, (_, { rows }) => {
                resolve(rows._array);
            });
        }
      });
    });
  }
