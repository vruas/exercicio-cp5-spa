import { useNavigate, useParams } from "react-router-dom";
import style from "./ExcluirProdutos.module.css";
import { useEffect, useState } from "react";

export default function ExcluirProdutos() {
  document.title = "Excluir Produtos";

  const navigate = useNavigate();

  // Receber o ID do produto pelo HOOK useParams( );
  const { id } = useParams();

  const [listaProdutoExterno, setListaProdutoExterno] = useState([]);
  const [prod, setProd] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Produto não encontrado");
        }
      })
      .then((data) => {
        setProd(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleDelete = (event) => {
    event.preventDefault();

    if (!prod) {
      console.error("Produto não encontrado");
      return;
    }

    fetch(`http://localhost:5000/produtos/${prod.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          alert("Produto excluído com sucesso!");
          navigate("/produtos");
        } else {
          throw new Error("Erro ao excluir o produto");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div>
        <h1>Excluir Produtos</h1>

        {prod && (
          <div className={style.card}>
            <h2>Produto Selecionado</h2>
            <figure>
              <img src={prod.img} alt={prod.desc} title={prod.desc} />
              <figcaption>
                {prod.nome} - <span>R$ </span>
                {prod.preco}
              </figcaption>
            </figure>
            <div className={style.btn}>
              <button onClick={handleDelete}>EXCLUIR</button>
              <button onClick={() => navigate("/produtos")}>CANCELAR</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}