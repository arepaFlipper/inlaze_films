
const SlideBar = () => {
  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">User Score</h2>
      <input type="range" min="0" max="100" className="w-full" />
    </div>
  )
}

export default SlideBar
