import pool from '../config/db';
import { Resource } from '../models/resourceModel';

export const createResource = async (name: string, description?: string): Promise<Resource> => {
  const result = await pool.query(
    'INSERT INTO resources (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return result.rows[0];
};

export const findResources = async (nameFilter?: string): Promise<Resource[]> => {
  let query = 'SELECT * FROM resources';
  const params = [];

  if (nameFilter) {
    query += ' WHERE name ILIKE $1';
    params.push(`%${nameFilter}%`);
  }

  const result = await pool.query(query, params);
  return result.rows;
};

export const findResourceById = async (id: number): Promise<Resource | null> => {
  const result = await pool.query('SELECT * FROM resources WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const updateResourceById = async (id: number, name: string, description?: string): Promise<Resource | null> => {
  const result = await pool.query(
    'UPDATE resources SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id]
  );
  return result.rows[0] || null;
};

export const deleteResourceById = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM resources WHERE id = $1', [id]);
  return !!result.rowCount;
};
