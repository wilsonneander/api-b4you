import { Request, Response } from "express";

export function listProducts(_req: Request, res: Response) {
    res.json([
        { id: 1, name: 'Produto A', price: 10 },
        { id: 2, name: 'Produto B', price: 20 },
      ]);
}