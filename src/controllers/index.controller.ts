import { request, Request, response, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../database";

export const getTutorials = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query("SELECT * FROM tutorials");
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.detail });
  }
};
export const getTutorialById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const response = await pool.query("SELECT * FRoM tutorials WHERE id=$1", [
    id,
  ]);
  return res.json(response.rows[0]);
};

export const createTutorials = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { title, description, published } = req.body;
  // console.log(name, email, phone);
  try {
    const response = await pool.query(
      "INSERT INTO tutorials (title,description,published) VALUES ($1,$2,$3)",
      [title, description, published]
    );
    return res.json({
      message: "user creates succefully",
      body: {
        tutorials: {
          title,
          description,
          published,
        },
      },
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

export const updateTutorials = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const { title, description, published } = req.body;
  try {
    await pool.query(
      "UPDATE tutorials SET title=$1 ,description= $2,published=$3 WHERE id=$4",
      [title, description, published, id]
    );
    return res.json({
      message: "user creates succefully",
      body: {
        user: {
          title,
          description,
          published,
        },
      },
    });
  } catch (e) {
    return res.status(400).json({ error: e.detail });
  }
};

export const deleteTutorials = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  try {
    await pool.query("DELETE FROM tutorials WHERE id=$1", [id]);
    console.log("abc");
    return res.json({ message: `user ${id} deleted successfully` });
  } catch (e) {
    return res.status(500).json({ error: e.detail });
  }
};

export const deleteAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // const id = parseInt(req.params.id);
  console.log("abc");
  try {
    await pool.query("DELETE FROM tutorials WHERE id=0");
    return res.json({ message: `all user deleted successfully` });
  } catch (e) {
    return res.status(500).json({ error: e.detail });
  }
};

export const findAllPublished = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // const id = parseInt(req.params.id);
    const response = await pool.query(
      "SELECT * FRoM tutorials WHERE published=true"
    );
    return res.json(response.rows);
  } catch (e) {
    return res.status(400).json({ error: e.detail });
  }
};

export const findAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const title = req.query.title;
    // const id = parseInt(req.params.id);
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    const response = await pool.query(
      "SELECT * FROM tutorials WHERE title like '%' || $1 || '%'",
      [title]
    );
    return res.json(response.rows);
  } catch (e) {
    return res.status(500).json({ error: e.detail });
  }
};
