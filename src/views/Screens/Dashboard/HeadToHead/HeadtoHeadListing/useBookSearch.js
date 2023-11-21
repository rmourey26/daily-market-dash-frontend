import { useEffect, useState } from 'react'
import axiosInstance from "src/services/axios";
import objectToArray from "src/hooks/functions/objectToArray.js";

export default function useBookSearch(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  //   useEffect(() => {
  //     setBooks([])
  //   }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)

    const getBracketsData = async () => {
      await axiosInstance
        .post("/brackets/", {
          action: "listing",
          starting: pageNumber,
          quantity: 50,
          member: window.localStorage.getItem("register"),
        })
        .then(res => {
          const list = objectToArray(res.data.leaders);
          setBooks(prevBooks => {
            return ([...prevBooks, ...list])
          })
          setHasMore(list.length > 0)
          setLoading(false)
        }).catch(function (errors) {
          console.log(errors);
          setError(true)
        })
    }
    getBracketsData()

  }, [pageNumber])

  return { loading, error, books, hasMore }
}