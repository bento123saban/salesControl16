                                                                                                    


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
            const sc = db.createObjectStore('SC',{keyPath:"monthCode"})
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
        if (!db.objectStoreNames.contains('SCHEDULE')) db.createObjectStore('SCHEDULE')
        if (!db.objectStoreNames.contains('SITE')) {
            const site = db.createObjectStore('SITE',{keyPath:'code'})
                x = [{
                id: 1,
                site: "DC Cikupa",
                range: 45,
                day: 0,
                toCont: 2,
                cpu: 45,
                code: "23"
            },
            {
                id: 2,
                site: "DC Jababeka",
                range: 45,
                day: 0,
                toCont: 2,
                cpu: 45,
                code: "72"
           },
            {
                id: 3,
                site: "DC Sidoarjo",
                range: 21,
                day: 3,
                toCont: 2,
                cpu: 21,
                code: "H6"
           },
            {
                id: 4,
                site: "DC WH Maluku",
                range: 2,
                toCont: 0,
                day: '',
                cpu: 2,
                code: "DN",
           },
            {
                id: 5,
                site: "Informa Maluku City",
                range: 2,
                toCont: 0,
                day: '',
                cpu: 0,
                code: "G8"
           }]
            x.forEach(data => site.add(data))
        }
        if (!db.objectStoreNames.contains('SETTINGS')) {
            const setting = db.createObjectStore('SETTINGS')
            setting.add({
                user : {
                    id          : 165925,
                    name        : 'Bendhard16',
                    email       : 'Bendhard16@gmail.com',
                    noHp        : '81364741823',
                    password    : '211221'
                },
                url : {
                    main: 'https://script.google.com/macros/s/AKfycbwttBUFtlACdB89QA6sd_x6pwLaYgqFK3jWfaYXF7pOsX0MvtYCmPMNiFUq8CULgvX4ZQ/exec',
                    salesCard : {
                        url     : 'https://docs.google.com/spreadsheets/d/19xNn3anMA7JMRitJRG_miH5VisuVpxU3Yi8nA193GwQ/edit?usp=drivesdk',
                        header  : 'B7:J7',
                        range   : 'B8:J',
                        sheet   : 'Bend',
                        value   : ''
                    },
                    afterSales: {
                        url     : 'https://docs.google.com/spreadsheets/d/19xNn3anMA7JMRitJRG_miH5VisuVpxU3Yi8nA193GwQ/edit?usp=drivesdk',
                        header  : 'L7:AF7',
                        range   : 'L8:AF',
                        sheet   : 'Bend',
                        value   : ''
                    },
                    container : {
                        url     : 'https://docs.google.com/spreadsheets/d/1BPkzech5es-yKOylOS-5HrYa4Ik0Ppv4zdgu1bqxcZ8/edit?usp=drivesdk',
                        header  : 'A4:W4', 
                        range   : 'A5:W',
                        sheet   : 'SDC MALUKU',
                        value   : ''
                    },
                    schedule : {
                        url     : undefined,
                        header  : undefined, 
                        range   : undefined,
                        sheet   : undefined,
                        value   : undefined
                    }
                },
                schedule : {
                    time : scheduleArrayx
                },   
                delivery : {
                    container : 4,
                    delivery : 3
                },
                afterSales: {
                    saveMonth : 3
                },
                salesCard:  {
                    saveMonth: 3
                }
            })
        }
        if (!db.objectStoreNames.contains('DEPT')) {
            const dept = db.createObjectStore('DEPT', {keyPath: 'code'}),
                x = [
                    {
                      name : 'Living Upholstered',
                      code : 'A',
                      zone : 'Living',
                      type : 'Furniture'
                    },
                    {
                      name : 'Home Clasic',
                      code : 'AB',
                      zone : 'Living',
                      type : 'Furniture'
                   },
                   {
                      name: 'Living Non-Upholstered',
                      code: 'AC',
                      zone: 'Living',
                      type: 'Furniture'
                   },
                   {
                      name: 'Banquet',
                      code: 'AD',
                      zone: 'Commercial',
                      type: 'Furniture'
                   },
                   {
                      name: 'Offices Seating',
                      code: 'AE',
                      zone: 'Commercial',
                      type: 'Furniture'
                   },
                   {
                      name: 'Furniclean',
                      code: 'AJ',
                      zone: '',
                      type: ''
                   },
                   {
                      name: 'Textile Bedding',
                      code: 'AK',
                      zone: 'Sleeping',
                      type: 'Accessories'
                   },
                   {
                      name: 'Special Transaction',
                      code: 'AL',
                      zone: '',
                      type: ''
                   },
                   {
                      name: 'Home Organizer',
                      code: 'AO',
                      zone: 'Living',
                      type: 'Accessories'
                   },
                   {
                      name: 'Home Kitchen',
                      code: 'AP',
                      zone: 'Kitchen',
                      type: 'Accessories'
                   },
                   {
                      name: 'Office Metal',
                      code: 'AR',
                      zone: 'Commercial',
                      type: 'Furniture'
                   },
                   {
                      name: 'Fashion Bags',
                      code: 'AS',
                      zone: 'Living',
                      type: 'Accessories'
                   },
                   {
                      name: 'Bedroom',
                      code: 'B',
                      zone: 'Sleeping',
                      type: 'Furniture'
                   },
                   {
                      name: 'Dinning',
                      code: 'C',
                      zone: 'Dinning',
                      type: 'Furniture'
                   },
                   {
                      name: 'Kitchen & Washbasin',
                      code: 'D',
                      zone: 'Kitchen',
                      type: 'Furniture'
                   },
                   {
                      name: 'Office',
                      code: 'E',
                      zone: 'Commercial',
                      type: 'Furniture'
                   },
                   {
                      name: 'Kids & Baby',
                      code: 'F',
                      zone: 'Sleeping',
                      type: 'Furniture'
                   },
                   {
                      name: 'Commercial Chair Table',
                      code: 'H',
                      zone: 'Commercial',
                      type: 'Furniture'
                   },
                   {
                      name: 'Lighting',
                      code: 'I',
                      zone: 'Living',
                      type: 'Accessories'
                   },
                   {
                      name: 'Mattress',
                      code: 'J',
                      zone: 'Sleeping',
                      type: 'Furniture'
                   },
                   {
                      name: 'Kept Concept',
                      code: 'K',
                      zone: 'Living',
                      type: 'Furniture'
                   },
                   {
                      name: 'Beauty Commercial',
                      code: 'L',
                      zone: 'Living',
                      type: 'Furniture'
                   },
                   {
                      name: 'Home Textile',
                      code: 'M',
                      zone: 'Living',
                      type: 'Accessories'
                   },
                   {
                      name: 'Home Decore',
                      code: 'N',
                      zone: 'Living',
                      type: 'Accessories'
                   },
                   {
                      name: 'Home Ware',
                      code: 'O',
                      zone: 'Kitchen',
                      type: 'Accessories'
                   },
                   {
                      name: 'Id Counter',
                      code: 'P',
                      zone: 'Living',
                      type: 'Furniture'
                   },
                   {
                      name: 'Non Merchandise',
                      code: 'X',
                      zone: '',
                      type: ''
                   }
                   ]
            x.forEach(data => dept.add(data))
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

