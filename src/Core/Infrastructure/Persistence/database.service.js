export class DatabaseService {

    fetch(key) {
        return new Promise((resolve, reject) => resolve(JSON.parse(localStorage.getItem(key))))
    }
    delete(key) {
        return new Promise((resolve, reject) => {
            localStorage.removeItem(key);
            resolve()
        })
    }

    save(key, data) {
        return new Promise((resolve, reject) => {
            localStorage.setItem(key, JSON.stringify(data))
            resolve(data)
        })
    }
}