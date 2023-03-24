import * as SQLite from 'expo-sqlite'

const database = SQLite.openDatabase('diaries.db')

export const initializeDB = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction(
      (transaction) => {
        transaction.executeSql(
          `CREATE TABLE IF NOT EXISTS diaries (
            diary_id INTEGER PRIMARY KEY NOT NULL,
            written_date TEXT NOT NULL,
            content TEXT,
            image_uri TEXT,
            happiness_level INTEGER
          )`,
          [],
          (_, result) => {
            resolve(result)
          },
          (_, error) => {
            console.log(error)
            reject(error)
          }
        )
      }
    )
  })

  return promise
}

export const createDiary = (diary) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO diaries (written_date, content, image_uri, happiness_level) values (?,?,?,?)`,
        [diary.written_date, diary.content, diary.image_uri, diary.happiness_level],
        (_,result) => {
          console.log(result)
          resolve(result)
        },
        (_, error) => {
          console.log(error)
          reject(error)
        }
      )
    })
  })
  return promise
}

export const getDiaryByDate = (date) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM diaries WHERE written_date = ?`,
        [date],
        (_, result) => {
          resolve(result.rows._array[0])
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
  return promise
}

export const getDiaries = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM diaries`,
        [],
        (_, result) => {
          resolve(result.rows._array)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
  return promise
}

export const updateDiary = (diary) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `UPDATE diaries
        SET content = ?, image_uri = ?, happiness_level = ?
        WHERE diary_id = ?
        `,
        [diary.content, diary.image_uri, diary.happiness_level, diary.diary_id],
        (_, result) => {
          resolve(result)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })

  return promise
}

export const dropDB = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `DROP TABLE IF EXISTS diaries`,
        [],
        (_, result) => {
          resolve(result)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })

  return promise
}