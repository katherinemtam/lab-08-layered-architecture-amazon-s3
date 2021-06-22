import pool from '../utils/pool.js';

export default class Profile {
  id;
  email;
  accountId;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.accountId = row.account_id;
  }

  static async insert({ email, accountId }) {

    const { rows } = await pool.query(`
      INSERT INTO profiles (email, account_id)
      VALUES ($1, $2)
      RETURNING *
    `, [email, accountId]);

    return new Profile(rows[0]);
  }

  static async findById(id) {

    const { rows } = await pool.query(`
      SELECT *
      FROM profiles
      WHERE id = $1
    `, [id]);

    return new Profile(rows[0]);
  }

  static async findAll() {

    const { rows } = await pool.query(`
      SELECT *
      FROM profiles
    `,);

    return rows.map(row => new Profile(row));
  }

  static async update(profile, id) {

    const { rows } = await pool.query(`
      UPDATE profiles
      SET email = $1,
          account_id = $2
      WHERE id = $3
      RETURNING *
    `, [profile.email, profile.accountId, id]);

    return new Profile(rows[0]);
  }
}
