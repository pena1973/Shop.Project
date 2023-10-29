import "./newCommentForm.css";
import { IProduct } from '../redux/types'
import { useState, } from "react";
import { useAppDispatch } from "../main";
import { setComents } from '../redux/slices';
import { setNewComment } from "../queries";
export interface newCommentFormProps {
  product: IProduct
}
export const NewCommentForm = ({
  product
}: newCommentFormProps) => {
  const dispatch = useAppDispatch();
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [commentId, setCommentId] = useState("");
  
  const handleClick = () => {
    // валидация
    if (!body.trim()) {
      setError("Ошибка: пустой текст"); return
    } else if (!name.trim()) {
      setError("Ошибка: пустое имя");
      return
    } else if (!email.trim()) {
      setError("Ошибка: пустой мейл");
      return
    } if (!email.includes("@")) {
      setError("Ошибка: формат мейл неправильный");
      return
    } else setError("");


    // Обработка запросов к апи  
    const doSuccessNewComment = (data: string) => {
      setCommentId(data);
      // прописали в компонент
      //  копи масив
      const comments = JSON.parse(JSON.stringify(product.comments));
      comments.push({
        id: commentId,
        name: name,
        email: email,
        body: body,
        productId: product.id
      });
      dispatch(setComents(comments));
    }
    const doErrorNewComment = () => {
      setError("ошибка при добавлении на сервере");
    }

    // отправили в базу
    setNewComment(product.id, name, email, body, doSuccessNewComment, doErrorNewComment)
    // очистили форму
    setBody("");
    setName("");
    setEmail("");
    setCommentId("");
  }

  return (
    <div className="new-coment">
      <div className="item-title-header"> New comment </div>

      <label className="new-comvent-label">
        Title: <input className="new-comvent-title" name="title" type="text" value={name} maxLength={50} onChange={e => { setName(e.target.value) }}></input>
        E-mail: <input className="new-comvent-mail" name="mail" type="text" value={email} maxLength={30} onChange={e => { setEmail(e.target.value) }}></input>
        Text:&nbsp;&nbsp; <textarea className="new-comvent-text" name="text" value={body} onChange={e => { setBody(e.target.value) }}></textarea>
      </label>
      <div className="error"> {error} </div>
      <button className="btn-add-coment" type="button" onClick={handleClick}>
        Add coment
      </button>
    </div>

  );
}

