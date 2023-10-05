import { useNavigate, useParams } from "react-router-dom";
import { ListaProdutos } from "../components/ListaProdutos";
import style from "./ExcluirProdutos.module.css";
import { useState } from "react";

export default function ExcluirProdutos() {
  document.title = "Excluir Produtos";

  const navigate = useNavigate();

  //Receber o ID do produto pelo HOOK useParams( );
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

  return (
    <>
      <div>
        <h1>Excluir Produtos</h1>
        
        <div className={style.card}>
            <h2>Produto Selecionado</h2>
            <figure>
                <img src={produto.img} alt={produto.desc} title={produto.desc}/>
                <figcaption>{produto.nome} - <span>R$ </span>{produto.preco}</figcaption>
            </figure>
            <div className={style.btn}>
                <button onClick={handleDelete}>EXCLUIR</button>
                <button onClick={()=> navigate("/produtos")}>CANCELAR</button>
            </div>
        </div>

      </div>
    </>
  );
}
