import { useDispatch } from 'react-redux'
import { deleteChar } from '../features/chars/charSlice'

function CharItem({ char }) {
  const dispatch = useDispatch()

  return (
    <div className='char'>
      <div>{new Date(char.createdAt).toLocaleString('en-US')}</div>
      <h2>Name: {char.charName}</h2>
      <h2>Class: {char.Class}</h2>
      <h2>Weapon: {char.weapon}</h2>
      <button onClick={() => dispatch(deleteChar(char._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default CharItem
