import { useEffect, useRef } from "react";
import styles from "./CharacterDetails.module.css";
import { Character } from "@/api/types";
import useCharacterInitials from "@/utils/useCharacterInitials";

const CharacterDetails = ({
  species,
  gender,
  house,
  dateOfBirth,
  yearOfBirth,
  wizard,
  ancestry,
  eyeColour,
  hairColour,
  wand,
  patronus,
  hogwartsStudent,
  hogwartsStaff,
  actor,
  alternate_actors,
  image,
  name,
}: Character) => {
  const characterCard = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (characterCard.current) {
      characterCard.current.style.setProperty(
        "--character-house-color",
        `var(--${house.toLowerCase()}-color)`
      );
    }
  }, []);

  return (
    <div ref={characterCard} className={styles.card}>
      {image ? (
        <img
          src={image}
          alt="character"
          className={styles.image}
          style={{
            viewTransitionName: "char-image",
          }}
        />
      ) : (
        <span className={styles.ImageNotFound}>
          {useCharacterInitials(name)}
        </span>
      )}
      <div className={styles.details}>
        <h2>Personal Information</h2>
        <ul>
          <li>
            <strong>Species:</strong> {species}
          </li>
          <li>
            <strong>Gender:</strong> {gender}
          </li>
          <li>
            <strong>House:</strong> {house}
          </li>
          <li>
            <strong>Date of Birth:</strong> {dateOfBirth}
          </li>
          <li>
            <strong>Year of Birth:</strong> {yearOfBirth}
          </li>
          <li>
            <strong>Wizard:</strong> {wizard ? "Yes" : "No"}
          </li>
          <li>
            <strong>Ancestry:</strong> {ancestry}
          </li>
        </ul>

        <h2>Physical Characteristics</h2>
        <ul>
          <li>
            <strong>Eye Colour:</strong> {eyeColour}
          </li>
          <li>
            <strong>Hair Colour:</strong> {hairColour}
          </li>
        </ul>

        <h2>Magical Attributes</h2>
        <ul>
          <li>
            <strong>Wand:</strong>
            <p>wood: {wand.wood}</p>
            <p>core: {wand.core}</p>
            <p>length: {wand.length} inches</p>
          </li>
          <li>
            <strong>Patronus:</strong> {patronus}
          </li>
        </ul>

        <h2>Hogwarts Information</h2>
        <ul>
          <li>
            <strong>Hogwarts Student:</strong> {hogwartsStudent ? "Yes" : "No"}
          </li>
          <li>
            <strong>Hogwarts Staff:</strong> {hogwartsStaff ? "Yes" : "No"}
          </li>
        </ul>

        <h2>Actor Information</h2>
        <ul>
          <li>
            <strong>Actor:</strong> {actor}
          </li>
          {alternate_actors.length > 0 && (
            <li>
              <strong>Alternate Actors:</strong> {alternate_actors.join(", ")}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CharacterDetails;
