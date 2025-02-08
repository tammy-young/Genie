
const ItemImagePlaceholder = ({ imageUrl }) => {
  return (
    <div className="flex justify-center pb-3">
      {
        process.env.REACT_APP_ENV === "dev" ? (
          <img src={imageUrl} className="bg-neutral-200 dark:bg-neutral-700 p-4 w-44 sm:w-[min(75%,15rem)] h-44 rounded flex justify-center items-center"></img>
        ) : (
          <a className="bg-neutral-200 dark:bg-neutral-700 w-44 sm:w-[min(75%,15rem)] h-44 rounded flex justify-center items-center cursor-pointer hover:text-primary hover:no-underline"
            href={imageUrl} target="_blank" rel="noreferrer">
            <p>Click to view image</p>
          </a>
        )
      }
    </div>
  )
}

export default ItemImagePlaceholder;
