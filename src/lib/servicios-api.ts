
export const getServicios = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/servicios?populate=*', {
        cache: "no-store",
        headers: {
          "Accept": "application/json",
        }
      })
      const response = await res.json()
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }