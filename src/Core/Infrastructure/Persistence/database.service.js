export class DatabaseService {

    fetch(key) {
        return new Promise((resolve) => resolve(JSON.parse(localStorage.getItem(key))))
    }
    delete(key) {
        return new Promise((resolve) => {
            localStorage.removeItem(key);
            resolve()
        })
    }

    save(key, data) {
        return new Promise((resolve) => {
            this.delete(key).then(_ => {
                localStorage.setItem(key, JSON.stringify(data))
            })
            resolve(data)
        })
    }
}