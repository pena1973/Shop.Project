import "./productImage.css";

export interface productImageProps {
  src: string,    
}
export const ProductImage = ({
  src,
  }: productImageProps) => {

  return (
    <div className="item-image-container">
      <img className="item-image" src={src} alt={src}></img>
      </div>
    
  );
}
