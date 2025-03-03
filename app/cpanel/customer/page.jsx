import React from 'react'

const Customer = () => {
  const [users, setusers] = useState([])
  useEffect(() => {
    const fetchuser = async () => {
      const response = await fetch('/api/users')
      const data = await response.json()
      setusers(data)
    }
    fetchuser()


  }, [])



  return (
    <div>




    </div>
  )
}

export default page