import React, { useEffect, useState } from "react"
import axios from "axios"
import styles from "./Character.module.scss"

interface Props {
  characterInfo: any
}

const Character: React.FC<Props> = ({ characterInfo }) => {
  const [titles, setTitles] = useState<any>([])
  const [showMore, setShowMore] = useState<boolean>(false)

  useEffect(() => {
    getFilmsTitle()
  }, [])

  const getFilmsTitle = () => {
    characterInfo.films.map(async (filmUri: string) => {
      const { data } = await axios.get(filmUri) 
      setTitles((prevState: any) => [...prevState, data.title])
    }) 
  }

  const renderBasicInfo = () => {
    return (
      <> 
        <h1>{"Name: " + characterInfo.name}</h1>
        <p><span className={styles.property_name}>Gender: </span>{characterInfo.gender}</p>
        <p><span className={styles.property_name}>Birth Year: </span>{characterInfo.birth_year}</p>
      </>
    )
  }

  const renderAdditionalInfo = () => {
    return (
      showMore &&
      <div className={styles.additional_info}>
        <h2>Addidional Information</h2>
        <p><span className={styles.property_name}>Height: </span>{characterInfo.height}</p>
        <p><span className={styles.property_name}>Eye color: </span>{characterInfo.eye_color}</p>
        <p>
          <span className={styles.property_name}>Films: </span>
          <ul>
            {titles.map((title: string) => <li key={title}>{title}</li>)}
          </ul>
        </p>
      </div>
    )
  }

  return (
    <div className={styles.character_container}>
      {renderBasicInfo()}
      <span className={styles.horizontal_bar} />
      {renderAdditionalInfo()}
      <button onClick={() => setShowMore(!showMore)} className={styles.button_show_more} />
    </div>
  )
}

export default Character
