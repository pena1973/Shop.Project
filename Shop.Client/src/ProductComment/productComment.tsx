import "./productComment.css";

export interface productCommentProps {  
  name: string,    
  body: string,    
}
export const ProductComment = ({
  name,    
  body, 
  }: productCommentProps) => {

  return (
    <div className="item-comment">
    <p className="item-comment-name"> {name} </p>
    <p className="item-comment-content"> {body} </p>
  </div>
    
  );
}
