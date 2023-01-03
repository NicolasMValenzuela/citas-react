export const Error = ({error}) => {
  return (
    <div className="bg-red-800 mb-3 text-white text-center p-3 rounded-md font-bold uppercase">
              <p>{error}</p>
    </div>
  )
}
