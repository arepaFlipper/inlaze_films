import logo from '../../public/inlaze_logo.png'

type Props = {
  labels: string[];
};

const Navbar = ({labels}: Props) => {
  return (
    <div className="flex justify-evenly">
      <img src={logo} alt="inlaze_logo" />
      {
        labels.map((label: string)=>{
          return (
            <div className='flex items-center'>
              <h2 className=''>{label}</h2>
            </div>
          )
        })
      }
    </div>
  )
}

export default Navbar
