import { Request, Response } from 'express';
import Products from "../models/productSchema";

export const AllProductsQ = async (req: Request, res: Response) => {
    try {
      const products = await Products.find({})
        .select('name quantity -_id') // Include nome e quantità, esclude ID MongoDB
        .lean();
  
      const formattedProducts = products.map(product => ({
        name: product.name,
        quantity: product.quantity // 👈 Mostra la quantità numerica esatta
      }));
  
      res.status(200).json(formattedProducts);
    } catch (error) {
      console.error('Error fetching all products:', error);
      res.status(500).json({ message: 'Errore del server' });
    }
  };