import { useFetch } from "@/hooks";
import { Link, useParams } from "react-router-dom";
import { getRandomAdvice } from "@/services";
import { Alert, Card, Image } from "react-bootstrap";
import { Loader, Texts } from "@/components";
import { useEffect, useState } from "react";
import { desktopDivider, iconDice, mobileDivider } from "@/assets";

const Home = () => {
  const { id } = useParams();
  const [fetchKey, setFetchKey] = useState(0);
  const { data, error, isLoading } = useFetch(getRandomAdvice, id, fetchKey);
  const [randomAdvice, setRandomAdvice] = useState(null);

  useEffect(() => {
    if (data.slip && !randomAdvice) {
      const adviceArray = Object.values(data.slip);
      const randomIndex = Math.floor(Math.random() * adviceArray.length);
      console.log("Calling setRandomAdvice with:", adviceArray[randomIndex]);
      setRandomAdvice({ advice: adviceArray[1], id: adviceArray[0] });
    }
  }, [data, randomAdvice]);

  const handleNewAdvice = () => {
    setFetchKey((prevKey) => prevKey + 1);
    setRandomAdvice(null);
  };


  return (
    <>
      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}
      {isLoading && <Loader />}
      {!error && !isLoading && data && (
        <Card
          style={{ maxWidth: "500px", maxHeight: "400px" }}
          className="card rounded-4 shadow-sm text-center p-lg-3 p-2"
        >
          {randomAdvice && (
            <Card.Body key={randomAdvice.id}>
              <Texts
                text={
                  <>
                    ADVICE <span> #{`${randomAdvice.id}`}</span>
                  </>
                }
                size="0.75rem"
                color="var(--Neon-Green)"
                className="textSpacing fw-medium"
              />

              <blockquote>
                <Texts
                  text={`"${randomAdvice.advice}"`}
                  size="1.5rem"
                  className="fw-bold"
                  color="var(--Light-Cyan)"
                />
              </blockquote>
              <br />
              <Image
                src={desktopDivider}
                className="position-absolute desktopDivider d-none d-lg-block"
              />
              <Image
                src={mobileDivider}
                className="position-absolute mobileDivider d-lg-none"
              />
              <Link className="roundBox position-absolute" onClick={handleNewAdvice}>
                <Image src={iconDice} alt="icon-dice" />
              </Link>
            </Card.Body>
          )}
        </Card>
      )}
    </>
  );
};

export default Home;
