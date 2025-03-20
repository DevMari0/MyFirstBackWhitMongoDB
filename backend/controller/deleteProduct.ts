import { Request, Response, NextFunction } from 'express';
import Products from '../models/productSchema';

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedProduct = await Products.findByIdAndDelete(id);

    if (!deletedProduct) {
      res.status(404).json({ message: 'Prodotto non trovato.' });
      return;
    }

    res.status(200).json({
      message: 'Prodotto eliminato con successo.',
      product: {
        name: deletedProduct.name,
        quantity: deletedProduct.quantity
      }
    });
  } catch (error) {
    console.error('Errore durante l\'eliminazione del prodotto:', error);
    res.status(500).json({ message: 'Errore del server.' });
  }
};

