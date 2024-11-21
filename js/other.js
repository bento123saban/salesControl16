                                                                                                    


/*class IndexedDBManager {
  constructor(storeName) {
    this.dbName = 'SMTDB';
    this.storeName = storeName;
    this.db = null;
  }

  // Membuka atau membuat database
  async openDatabase(version = 1) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, version);

      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        if (!this.db.objectStoreNames.contains(this.storeName)) {
          this.db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        console.log("Database berhasil dibuka:", this.dbName);
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error("Gagal membuka database:", event.target.errorCode);
        reject(event.target.errorCode);
      };
    });
  }

  // Menambahkan data
  async addData(data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.add(data);
      request.onsuccess = () => {
        console.log("Data berhasil ditambahkan:", data);
        resolve(data);
      };

      request.onerror = (event) => {
        console.error("Gagal menambahkan data:", event.target.errorCode);
        reject(event.target.errorCode);
      };
    });
  }

  // Membaca semua data
  async getAllData() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);

      const request = store.getAll();
      request.onsuccess = (event) => {
        console.log("Data berhasil dibaca:", event.target.result);
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.error("Gagal membaca data:", event.target.errorCode);
        reject(event.target.errorCode);
      };
    });
  }

  // Memperbarui data
  async updateData(data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.put(data);
      request.onsuccess = () => {
        console.log("Data berhasil diperbarui:", data);
        resolve(data);
      };

      request.onerror = (event) => {
        console.error("Gagal memperbarui data:", event.target.errorCode);
        reject(event.target.errorCode);
      };
    });
  }

  // Menghapus data
  async deleteData(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.delete(key);
      request.onsuccess = () => {
        console.log("Data berhasil dihapus:", key);
        resolve(key);
      };

      request.onerror = (event) => {
        console.error("Gagal menghapus data:", event.target.errorCode);
        reject(event.target.errorCode);
      };
    });
  }
}*/

class dataBase {
    constructor (storeName, dbName = 'BENSMT', version = 1) {
        this.storeName  = storeName
        this.DB         = new Promise ((res, rej) => {
            const req = indexedDB.open(this.dbName, version)
        })
    }
    
    openDB = asyc function () {
        return new Promise ((res, rej) => {
            const request = indexedDB.open(dbName, 1)
            
        })
    }
    
    createDefault = async (db) => {
        if (!db.objectStoreNames.contains('SC')) {
            const sc = db.createObjectStore('SC', {keyPath : "monthCode"})
            sc.add({
                code    : 'default',
                target  : {
                    main        : 150000000,
                    furniture   : 120000000,
                    accesories  : 30000000,
                    furnipro    : 25,
                    cuciAC      : 350000,
                    dept        : []
                },
                sales   : []
            })
        }
        if (!db.objectStoreNames.contains('AS')) db.createObjectStore('AS')
        if (!db.objectStoreNames.contains('SCHEDULE')) {
            db.createObjectStore('SCHEDULE')
            sch.add([])
        }
    }
    
    openDB = async () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, version);
    
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                 if (!this.db.objectStoreNames.contains(this.storeName)) {
                    this.db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
                }
            };
    
            request.onsuccess = (event) => {};

            request.onerror = (event) => {
                console.error("Gagal membuka database:", event.target.errorCode);
                reject(false);
            };
        });
    }
}

