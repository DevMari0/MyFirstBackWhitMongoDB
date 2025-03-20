
import { Request, Response } from "express";
import { Product } from "../type/product";
import { AppSuccess } from "../type/succesType";
import { responseStatus } from "../constants/status";
import Products from "../models/productSchema";

const createProduct = async (
  request: Request<{}, unknown, Product>,
  response: Response
): Promise<void> => {
  const body = request.body;
console.log("entro in createprodotto")

if (!body.name || !body.quantity || !body.price || !body.category) {
    response.status(responseStatus.BAD_REQUEST).json({
      message: "Nome, quantità, prezzo e categoria sono obbligatori",
    });
  }

  try {
    const newProduct = await Products.create({
      name: body.name,
      quantity: body.quantity,
      price: body.price,
      disponibility: body.disponibility,
      category: body.category,
      timestamp: new Date().toISOString(),
    });

    AppSuccess.getInstance().successResponse(
      response,
      "Prodotto creato con successo",
      responseStatus.OK,
      { newProduct }
    );
  } catch (error) {
    console.error("Errore durante la creazione del prodotto:", error);
    response.status(responseStatus.INTERNAL_SERVER_ERROR).json({
      message: "Si è verificato un errore durante la creazione del prodotto",
    });
  }
};

export default createProduct;