import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB( "jate", 1);
  const tx =db.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  await store.put(content);
  console.log("Content added to database:", content);
  await tx.done;
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB("jate", 1);
  const tx = db.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const allContent = await store.getAll();
  console.log("All content from database:", allContent);
  await tx.done;
  return allContent;
};


(async () => {
  await initdb();

  await putDb({name: "John Doe", age: 30});
  await putDb({name: "Jane Smith", age: 25});
  const allContent = await getDb();
  console.log(allContent);
})();

