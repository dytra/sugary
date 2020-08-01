import * as SQLite from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm';

export default class Animal extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('sugary.db')
  }

  static get tableName() {
    return 'consumptions'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      title: { type: types.VARCHAR },
      type: { type: types.VARCHAR },
      remark: { type: types.TEXT,},
      amount: { type: types.INTEGER },
      createdDate: { type: types.INTEGER, default: () => Date.now() }
    }
  }
}
