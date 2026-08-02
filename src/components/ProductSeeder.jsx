import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { products } from "../mock/data";

const ProductSeeder = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadProducts = async () => {
    setLoading(true);
    setStatus("");

    try {
      for (const { id, ...product } of products) {
        await setDoc(doc(db, "products", id), { ...product, stock: 20 });
      }

      setStatus("Los 12 productos se cargaron correctamente en Firestore con IDs automáticos.");
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setStatus("No se pudieron cargar los productos. Revisa las reglas de Firestore.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-5 text-center">
      <h1>Cargar catálogo inicial</h1>

      <p>
        Este botón crea los 12 productos utilizando los IDs definidos para cada producto.
      </p>

      <button
        type="button"
        className="btn btn-dark"
        onClick={uploadProducts}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Cargar 12 productos"}
      </button>

      {status && (
        <div className="alert alert-success mt-4">
          {status}
        </div>
      )}
    </main>
  );
};

export default ProductSeeder;