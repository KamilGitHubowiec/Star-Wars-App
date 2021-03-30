import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import InfiniteScroll from "react-infinite-scroll-component"
import styles from "./CharactersList.module.scss"
import { getCharactersAction, getCharactersByQueryAction } from "../../redux/actions/charactersAction"
import Character from "../Character/Character"
import Loader from "../Loader/Loader"

const CharactersList: React.FC = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)
  const [query, setQuery] = useState<string>("")
  const { charactersList, charactersData } = useSelector((state: RootStateOrAny) => state.characters)
  let hasMore: boolean = true
  if (charactersList.length === (charactersData && charactersData.count)) hasMore = false

  useEffect(() => {
    dispatch(getCharactersAction(page, query))
  }, [dispatch, page])
  
  const handleChange = (e: any) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(getCharactersByQueryAction(page, query))
  }

  const renderFilters = () => {
    return(
      <form onSubmit={(e) => handleSubmit(e)} className={styles.filters_container}>
        <div className={styles.filters_content}>
          <input onChange={(e) => handleChange(e)} type="text" value={query} placeholder="SEARCH CHARACTER" />
          <button type="submit">SEARCH</button>
        </div>
      </form>
    )
  }

  const renderList = () => {
    return (
      <InfiniteScroll
        dataLength={charactersList.length} 
        hasMore={hasMore} 
        next={() => setPage(page + 1)}
        scrollThreshold={0.99} 
        loader={<Loader />}
        endMessage={""}
        className={styles.list}>
        <h1>Results: {charactersData && charactersData.count}</h1>
        {charactersList && charactersList.map((character: any) => {
            return <Character key={character.name} characterInfo={character} />
          })
        }
      </InfiniteScroll>
    )
  }

  return (
    <>
    <div className={styles.list_container}>
      {renderFilters()}
      {renderList()}
    </div>
    </>
  )
}

export default CharactersList
