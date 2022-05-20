import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CharForm from '../components/CharForm'
import CharItem from '../components/CharItem'
import Spinner from '../components/Spinner'
import { getChars, reset } from '../features/chars/charSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { chars, isLoading, isError, message } = useSelector(
    (state) => state.chars
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getChars())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Characters Dashboard</p>
      </section>

      <CharForm />

      <section className='content'>
        {chars.length > 0 ? (
          <div className='chars'>
            {chars.map((char) => (
              <CharItem key={char._id} char={char} />
            ))}
          </div>
        ) : (
          <h3>You have not created any characters</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
