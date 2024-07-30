import logo from '../../public/inlaze_logo.png'

type Props = {
  labels: {
    label: string;
  }[]
};

const Navbar = ({ labels }: Props) => {
  return (
    <div className="bg-black flex justify-evenly">
      <img src={logo} alt="inlaze_logo" />
      {
        labels.map(({ label }: { label: string }, idx) => {
          return (
            <div key={`${label}-${idx}`} className='flex items-center'>
              <h2 className=''>{label}</h2>
            </div>
          )
        })
      }
    </div>
  )
}

export default Navbar
